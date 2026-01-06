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
// export default function Home() {
//   const [nextVisitDate, setNextVisitDate] = useState<string>("");
//   const [milestones, setMilestones] = useState<any>(null);

//   useEffect(() => {
//     (async () => {
//       const coupleId = await getItem("coupleId");
//       if (!coupleId) return;

//       const snap = await getDoc(doc(db, "couples", coupleId));
//       setMilestones((snap.data() as any)?.milestones ?? null);
//       // const date = (snap.data() as any)?.nextVisitDate as string | undefined;
//       // if (date) setNextVisitDate(date);
//     })();
//   }, []);

//   const countdownText = nextVisitDate
//     ? `${daysUntil(nextVisitDate)} days until your next visit`
//     : "Set your next visit date";

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
//       <Text>{countdownText}</Text>
//       {milestones?.firstDate && (
//         <Text>{daysSince(milestones.firstDate)} days since your first date</Text>
//       )}

//       {milestones?.anniversary && (
//         <Text>{daysSince(milestones.anniversary)} days since your anniversary</Text>
//       )}

//       <Button title="Set countdown" onPress={() => router.push("/(app)/countdown")} />

//       <Button title="New check-in" onPress={() => router.push("/(app)/new-checkin")} />
//       <Button title="Timeline" onPress={() => router.push("/(app)/timeline")} />
//       <Button title="Daily prompt" onPress={() => router.push("/(app)/prompt")} />
//       <Button title="Edit milestones" onPress={() => router.push("/(app)/milestones")} />
//     </View>
//   );
// }
