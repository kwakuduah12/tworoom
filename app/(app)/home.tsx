import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Today</Text>
      <Button title="New check-in" onPress={() => router.push("/(app)/new-checkin")} />
      <Button title="Timeline" onPress={() => router.push("/(app)/timeline")} />
    </View>
  );
}