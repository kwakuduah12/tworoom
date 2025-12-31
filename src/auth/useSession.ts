import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../src/firebase";
import { getItem } from "../storage";

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [coupleId, setCoupleId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      const storedCoupleId = await getItem("coupleId") ?? null;
      setCoupleId(storedCoupleId);
      setLoading(false);
    });

    return unsub;
  }, []);

  return { user, coupleId, loading };
}