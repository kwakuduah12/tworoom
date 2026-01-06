import { View, TextInput, Button, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { verifyOtp } from "../../src/auth/otp";
import { createSession } from "../../src/auth/session";
import { useState } from "react";

export default function EnterCode() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (loading) return;
    setLoading(true);
    setError("");
    const ok = await verifyOtp(email!, code);
    if (!ok) {
      setLoading(false);
      return;
    }

    await createSession(email!);
    router.replace("/(pairing)/create-couple");
  }

  return (
    <View>
      <TextInput placeholder="6-digit code" onChangeText={setCode} />
      <Button title="Verify" onPress={submit} disabled={loading || code.length !== 6}/>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
}