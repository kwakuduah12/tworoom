import { signInAnonymously, updateEmail } from "firebase/auth";
import { auth } from "../../src/firebase";

export async function createSession(email: string) {
  const cred = await signInAnonymously(auth);
  await updateEmail(cred.user, email);
  return cred.user;
}