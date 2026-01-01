import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getItem } from "../storage";

export async function createCheckin(text: string, mood: string, photoUrl?: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");

  const coupleId = await getItem("coupleId");
  if (!coupleId) throw new Error("No coupleId");

  await addDoc(collection(db, "couples", coupleId, "checkins"), {
    uid,
    text,
    mood,
    photoUrl: photoUrl ?? null,
    createdAt: serverTimestamp(),
  });
}