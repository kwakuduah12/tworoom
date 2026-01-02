import { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import { getItem } from "../../src/storage";
import { router } from "expo-router";

type Milestones = {
  firstDate?: string;
  anniversary?: string;
  firstVisit?: string;
};

export default function Milestones() {
  const [data, setData] = useState<Milestones>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const coupleId = await getItem("coupleId");
      if (!coupleId) return;

      const snap = await getDoc(doc(db, "couples", coupleId));
      const milestones = (snap.data() as any)?.milestones ?? {};

      setData(milestones);
      setLoading(false);
    })();
  }, []);

  async function save() {
    const coupleId = await getItem("coupleId");
    if (!coupleId) return;

    await updateDoc(doc(db, "couples", coupleId), {
      milestones: data,
    });

    router.back();
  }

  if (loading) return null;

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Milestones</Text>

      <TextInput
        placeholder="First date (YYYY-MM-DD)"
        value={data.firstDate ?? ""}
        onChangeText={(v) => setData((d) => ({ ...d, firstDate: v }))}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Anniversary (YYYY-MM-DD)"
        value={data.anniversary ?? ""}
        onChangeText={(v) => setData((d) => ({ ...d, anniversary: v }))}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="First visit (YYYY-MM-DD)"
        value={data.firstVisit ?? ""}
        onChangeText={(v) => setData((d) => ({ ...d, firstVisit: v }))}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Save milestones" onPress={save} />
    </View>
  );
}