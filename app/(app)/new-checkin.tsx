import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import { createCheckin } from "../../src/checkins/createCheckin";
import { router } from "expo-router";

const MOODS = ["🙂", "😔", "😴", "😄", "😤"];

export default function NewCheckin() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("🙂");

  async function submit() {
    if (!text.trim()) return;
    await createCheckin(text, mood);
    router.back();
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>How are you today?</Text>

      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {MOODS.map((m) => (
          <Button key={m} title={m} onPress={() => setMood(m)} />
        ))}
      </View>

      <TextInput
        placeholder="Write a short update…"
        value={text}
        onChangeText={setText}
        multiline
        style={{ borderWidth: 1, padding: 10, minHeight: 80 }}
      />

      <Button title="Post check-in" onPress={submit} />
    </View>
  );
}