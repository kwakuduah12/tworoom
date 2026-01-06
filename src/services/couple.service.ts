import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getCouple(coupleId: string) {
  const snap = await getDoc(doc(db, "couples", coupleId));
  return snap.exists() ? snap.data() : null;
}

export function subscribeToCouple(
  coupleId: string,
  callback: (data: any) => void
) {
  return onSnapshot(doc(db, "couples", coupleId), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}

export async function updateCouple(
  coupleId: string,
  updates: Record<string, any>
) {
  await updateDoc(doc(db, "couples", coupleId), updates);
}