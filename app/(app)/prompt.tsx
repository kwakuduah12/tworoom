import { View, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../src/firebase";
import { getItem } from "../../src/storage";
import { getDailyPrompt, getTodayKey } from "../../src/prompts/getDailyPrompts";

type PromptAnswer = {
  text: string;
  createdAt?: any;
};

type PromptData = {
  prompt: string;
  answers: Record<string, PromptAnswer>;
};

export default function Prompt() {
  const [text, setText] = useState("");
  const [data, setData] = useState<PromptData | null>(null);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    (async () => {
      const coupleId = await getItem("coupleId");
      if (!coupleId) return;

      const ref = doc(db, "couples", coupleId, "prompts", getTodayKey());
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const raw = snap.data() as Partial<PromptData>;

        const prompt = typeof raw.prompt === "string" ? raw.prompt : getDailyPrompt();

        const answers =
          raw.answers && typeof raw.answers === "object"
            ? (raw.answers as Record<string, PromptAnswer>)
            : {};

        setData({ prompt, answers });
      } else {
        const prompt = getDailyPrompt();

        await setDoc(ref, {
          prompt,
          answers: {},
        });

        setData({ prompt, answers: {} });
      }
    })();
  }, []);

  async function submit() {
    if (!uid) return;
    const coupleId = await getItem("coupleId");
    if (!coupleId) return;

    const ref = doc(db, "couples", coupleId, "prompts", getTodayKey());

    await updateDoc(ref, {
      [`answers.${uid}`]: {
        text,
        createdAt: serverTimestamp(),
      },
    });
  }

  if (!data) return null;

  const myAnswer: PromptAnswer | undefined = uid ? data.answers?.[uid] : undefined;

  const partnerAnswer: PromptAnswer | undefined =
    Object.entries(data.answers || {})
      .find(([key]) => key !== uid)?.[1] as PromptAnswer | undefined;

  return (
    <View style={{ padding: 20 }}>
      <Text>{data.prompt}</Text>

      {!myAnswer && (
        <>
          <TextInput
            placeholder="Your answer"
            value={text}
            onChangeText={setText}
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          />
          <Button title="Submit" onPress={submit} />
        </>
      )}

      {myAnswer && (
        <View style={{ marginTop: 20 }}>
          <Text>You:</Text>
          <Text>{myAnswer.text}</Text>
        </View>
      )}

      {partnerAnswer && (
        <View style={{ marginTop: 20 }}>
          <Text>Them:</Text>
          <Text>{partnerAnswer.text}</Text>
        </View>
      )}
    </View>
  );
}