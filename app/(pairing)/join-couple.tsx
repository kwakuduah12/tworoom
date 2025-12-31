import { View, TextInput, Button, Text } from "react-native";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../src/firebase";
import { setItem } from "../../src/storage";
import { useState } from "react";
import { router } from "expo-router";

export default function JoinCouple() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function join() {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(
      collection(db, "couples"),
      where("coupleCode", "==", code.toUpperCase())
    );

    const snap = await getDocs(q);
    if (snap.empty) {
      setError("Invalid code");
      return;
    }

    const coupleDoc = snap.docs[0];
    const data = coupleDoc.data();

    if (data.members.length >= 2) {
      setError("This couple is already full");
      return;
    }

    await updateDoc(doc(db, "couples", coupleDoc.id), {
      members: [...data.members, uid],
    });

    await setItem("coupleId", coupleDoc.id);
    router.replace("/(app)/home");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Enter couple code"
        onChangeText={setCode}
        autoCapitalize="characters"
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Join" onPress={join} />
    </View>
  );
}