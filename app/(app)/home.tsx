import { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../src/firebase";
import { getItem } from "../../src/storage";
import { getCouple, subscribeToCouple, updateCouple } from "../../src/services/couple.service";
import { createMemory } from "../../src/memories/createMemory";
import { useMemories } from "../../src/memories/useMemories";

function daysUntil(dateYMD: string) {
  const [y, m, d] = dateYMD.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = target.getTime() - start.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function daysSince(dateYMD: string) {
  const [y, m, d] = dateYMD.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = today.getTime() - start.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const [couple, setCouple] = useState<any>(null);
  const [text, setText] = useState("");
  const { memories } = useMemories(couple?.id);

  useEffect(() => {
    let unsub: any;

    (async () => {
      const coupleId = await getItem("coupleId");
      if (!coupleId) return;

      unsub = subscribeToCouple(coupleId, setCouple);
    })();

    return () => unsub && unsub();
  }, []);

  if (!couple) return null;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
      {couple.nextVisitDate && (
        <Text>{couple.nextVisitDate}</Text>
      )}

      {couple.milestones?.firstDate && (
        <Text>First date: {couple.milestones.firstDate}</Text>
      )}

      <Button title="Set countdown" onPress={() => router.push("/(app)/countdown")} />
      <Button title="Edit milestones" onPress={() => router.push("/(app)/milestones")} />
      <Button title="Daily prompt" onPress={() => router.push("/(app)/prompt")} />
      <Button title="Timeline" onPress={() => router.push("/(app)/timeline")} />
      <View style={{ width: "100%", padding: 20 }}>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Test Memories
      </Text>

      <TextInput
        placeholder="Write a memory..."
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button
        title="Save memory"
        onPress={async () => {
          if (!couple?.id || !auth.currentUser) return;
          await createMemory(couple.id, auth.currentUser.uid, text);
          setText("");
        }}
      />

      <View style={{ marginTop: 20 }}>
        {memories.map((m) => (
          <Text key={m.id} style={{ marginBottom: 6 }}>
            • {m.text}
          </Text>
        ))}
      </View>
    </View>
    </View>
  );
}
