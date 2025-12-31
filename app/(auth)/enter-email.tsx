import { View, TextInput, Button } from "react-native";
import { router } from "expo-router";
import { createOtp } from "../../src/auth/otp";
import { sendOtpEmail } from "../../src/auth/email";
import { useState } from "react";

export default function EnterEmail() {
  const [email, setEmail] = useState("");

  async function submit() {
    const code = await createOtp(email);
    await sendOtpEmail(email, code);
    router.push({ pathname: "/(auth)/enter-code", params: { email } });
  }

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <Button title="Send code" onPress={submit} />
    </View>
  );
}