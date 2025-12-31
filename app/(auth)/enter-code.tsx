import { View, TextInput, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { verifyOtp } from "../../src/auth/otp";
import { createSession } from "../../src/auth/session";
import { useState } from "react";

export default function EnterCode() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");

  async function submit() {
    const ok = await verifyOtp(email!, code);
    if (!ok) return;

    await createSession(email!);
    router.replace("/(pairing)/create-couple");
  }

  return (
    <View>
      <TextInput placeholder="6-digit code" onChangeText={setCode} />
      <Button title="Verify" onPress={submit} />
    </View>
  );
}