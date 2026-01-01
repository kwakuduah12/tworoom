import { addMinutes } from "date-fns";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import * as Crypto from "expo-crypto";

function normalizeEmail(email: string) {
  return email.toLowerCase().trim();
}

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashCode(code: string) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    code
  );
}

export async function createOtp(email: string) {
  const safeEmail = normalizeEmail(email);
  const code = generateCode();
  const codeHash = await hashCode(code);

  await setDoc(doc(db, "otp_requests", safeEmail), {
    codeHash,
    expiresAt: addMinutes(new Date(), 10),
    attempts: 0,
  });

  return code;
}

export async function verifyOtp(email: string, inputCode: string) {
  const ref = doc(db, "otp_requests", email);
  
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;

  const data = snap.data();
  if (data.attempts >= 5) return false;
  if (new Date() > data.expiresAt.toDate()) return false;

  const inputHash = await hashCode(inputCode);

  if (inputHash !== data.codeHash) {
    await updateDoc(ref, { attempts: data.attempts + 1 });
    return false;
  }

  return true;
}