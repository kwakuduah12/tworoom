import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../src/firebase";
import { getItem } from "../../src/storage";

type Checkin = {
  id: string;
  uid: string;
  text: string;
  mood: string;
  createdAt?: any;
};

export default function Timeline() {
  const [items, setItems] = useState<Checkin[]>([]);

  useEffect(() => {
    let unsub: any;

    (async () => {
      const coupleId = await getItem("coupleId");
      if (!coupleId) return;

      const q = query(
        collection(db, "couples", coupleId, "checkins"),
        orderBy("createdAt", "desc")
      );

      unsub = onSnapshot(q, (snap) => {
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setItems(data);
      });
    })();

    return () => unsub && unsub();
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => {
        const isMe = item.uid === auth.currentUser?.uid;
        return (
          <View
            style={{
              alignSelf: isMe ? "flex-end" : "flex-start",
              backgroundColor: isMe ? "#DCF8C6" : "#EEE",
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
              maxWidth: "80%",
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.mood}</Text>
            <Text>{item.text}</Text>
          </View>
        );
      }}
    />
  );
}