import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function createMemory(
  coupleId: string,
  authorId: string,
  text: string
) {
  if (!text.trim()) return;

  const ref = collection(db, "couples", coupleId, "memories");

  await addDoc(ref, {
    text: text.trim(),
    authorId,
    createdAt: serverTimestamp(),
  });
}