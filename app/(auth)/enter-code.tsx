import { View, TextInput, Button, Text, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { verifyOtp } from "../../src/auth/otp";
import { createSession } from "../../src/auth/session";
import { useState } from "react";
import { authStyles } from "../../src/ui/authStyles";

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
      setError("Invalid or expired code");
      setLoading(false);
      return;
    }

    await createSession(email!);
    router.replace("/(pairing)/create-couple");
  }

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Enter code</Text>
      <Text style={authStyles.subtitle}>
        Check your email and enter the 6-digit code
      </Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="6-digit code"
        placeholderTextColor="#9CA3AF"
        keyboardType="number-pad"
        style={authStyles.input}
        accessibilityLabel="One-time passcode"
      />

      {error ? <Text style={authStyles.error}>{error}</Text> : null}

      <Pressable
        onPress={submit}
        disabled={loading || code.length < 6}
        style={[
          authStyles.button,
          (loading || code.length < 6) && authStyles.buttonDisabled,
        ]}
        accessibilityRole="button"
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Verifying…" : "Verify"}
        </Text>
      </Pressable>
    </View>
);
}