import { View, Text, Button } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth } from "../../src/firebase";
import { db } from "../../src/firebase";
import { generateCoupleCode } from "../../src/couple/utils";
import { setItem } from "../../src/storage";
import { router } from "expo-router";

export default function CreateCouple() {
  async function create() {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const coupleCode = generateCoupleCode();

    const ref = await addDoc(collection(db, "couples"), {
      members: [uid],
      coupleCode,
      createdAt: serverTimestamp(),
    });

    await setItem("coupleId", ref.id);

    router.replace("/(app)/home");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create your private space</Text>
      <Button title="Create couple" onPress={create} />
      <Button title="I have a code" onPress={() => router.push("/(pairing)/join-couple")} />
    </View>
  );
}