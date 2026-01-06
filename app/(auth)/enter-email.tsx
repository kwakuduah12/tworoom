import { View, TextInput, Button, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { createOtp } from "../../src/auth/otp";
import { sendOtpEmail } from "../../src/auth/email";
import { useState } from "react";
import { authStyles } from "../../src/ui/authStyles";

export default function EnterEmail() {
  const [email, setEmail] = useState("");

  async function submit() {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      alert ("Please enter a valid email address");
      return;
    }
    if (!trimmedEmail.includes("@")) {
      alert ("Please enter a valid email address");
      return;
    }

    const code = await createOtp(trimmedEmail);
    await sendOtpEmail(trimmedEmail, code);
    router.push({ pathname: "/(auth)/enter-code", params: { email: trimmedEmail } });
  }

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Sign in</Text>
      <Text style={authStyles.subtitle}>
        Enter your email to receive a one-time code
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={authStyles.input}
        accessibilityLabel="Email address"
      />

      <Pressable
        onPress={submit}
        disabled={!email.trim()}
        style={[
          authStyles.button,
          !email.trim() && authStyles.buttonDisabled,
        ]}
        accessibilityRole="button"
      >
        <Text style={authStyles.buttonText}>Send code</Text>
      </Pressable>
    </View>
  );
}