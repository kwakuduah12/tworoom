import { Platform } from "react-native";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";

export async function getItem(key: string) {
  if (Platform.OS === "web") {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  return await getItemAsync(key);
}

export async function setItem(key: string, value: string) {
  if (Platform.OS === "web") {
    window.localStorage.setItem(key, value);
    return;
  }

  await setItemAsync(key, value);
}

export async function removeItem(key: string) {
  if (Platform.OS === "web") {
    window.localStorage.removeItem(key);
    return;
  }

  await deleteItemAsync(key);
}