import { Stack, Redirect, useSegments } from "expo-router";
import { useSession } from "../src/auth/useSession";

export default function RootLayout() {
  const { user, coupleId, loading } = useSession();
  const segments = useSegments();

  if (loading) return null;

  const inAuth = segments[0] === "(auth)";
  const inPairing = segments[0] === "(pairing)";
  const inApp = segments[0] === "(app)";

  // Not signed in → auth
  if (!user && !inAuth) {
    return <Redirect href="/(auth)/enter-email" />;
  }

  // Signed in but no couple → pairing
  if (user && !coupleId && !inPairing) {
    return <Redirect href="/(pairing)/create-couple" />;
  }

  // Signed in + paired → app
  if (user && coupleId && !inApp) {
    return <Redirect href="/(app)/home" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}