import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import { getItem } from "../../src/storage";
import { getCouple, subscribeToCouple, updateCouple } from "../../src/services/couple.service";

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
    </View>
  );
}
