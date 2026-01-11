import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Memory } from "../types/memory";

export function useMemories(coupleId?: string) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coupleId){
        setMemories([]);
        setLoading(false);
        return;
    }

    const q = query(
      collection(db, "couples", coupleId, "memories"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Memory, "id">),
      }));
      setMemories(data);
      setLoading(false);
    });

    return unsub;
  }, [coupleId]);

  return { memories, loading };
}