import { useEffect, useState } from "react";
import { View, Text, Button, Platform, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import { getItem } from "../../src/storage";
import { router } from "expo-router";

function toYMD(date: Date) {
  return date.toISOString().slice(0, 10);
}

function fromYMD(value: string) {
  // value: YYYY-MM-DD
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export default function Countdown() {
  const [loading, setLoading] = useState(true);
  const [savedDate, setSavedDate] = useState<string>("");

  // For native picker
  const [pickerDate, setPickerDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // For web input
  const [webDate, setWebDate] = useState("");

  useEffect(() => {
    (async () => {
      const coupleId = await getItem("coupleId");
      if (!coupleId) return;

      const ref = doc(db, "couples", coupleId);
      const snap = await getDoc(ref);

      const nextVisitDate = (snap.data() as any)?.nextVisitDate as string | undefined;

      if (nextVisitDate) {
        setSavedDate(nextVisitDate);
        setPickerDate(fromYMD(nextVisitDate));
        setWebDate(nextVisitDate);
      }

      setLoading(false);
    })();
  }, []);

  async function save(dateYMD: string) {
    const coupleId = await getItem("coupleId");
    if (!coupleId) return;

    const ref = doc(db, "couples", coupleId);
    await updateDoc(ref, { nextVisitDate: dateYMD });

    setSavedDate(dateYMD);
    router.back();
  }

  if (loading) return null;

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Next visit countdown</Text>

      <Text>Saved date: {savedDate || "Not set yet"}</Text>

      {Platform.OS === "web" ? (
        <>
          <TextInput
            value={webDate}
            onChangeText={setWebDate}
            placeholder="YYYY-MM-DD"
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 12 }}
          />
          <Button
            title="Save date"
            onPress={() => save(webDate.trim())}
            disabled={!webDate.trim()}
          />
        </>
      ) : (
        <>
          <Button title="Pick a date" onPress={() => setShowPicker(true)} />

          {showPicker && (
            <DateTimePicker
              value={pickerDate}
              mode="date"
              display="default"
              onChange={(_, selected) => {
                setShowPicker(false);
                if (selected) setPickerDate(selected);
              }}
            />
          )}

          <Button title="Save date" onPress={() => save(toYMD(pickerDate))} />
        </>
      )}
    </View>
  );
}