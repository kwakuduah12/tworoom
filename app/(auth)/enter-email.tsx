import { View, TextInput, Button } from "react-native";
import { router } from "expo-router";
import { createOtp } from "../../src/auth/otp";
import { sendOtpEmail } from "../../src/auth/email";
import { useState } from "react";

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
    <View>
      <TextInput value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          marginBottom: 12,
  }} />
      <Button title="Send code" onPress={submit} disabled={!email.trim()} />
    </View>
  );
}