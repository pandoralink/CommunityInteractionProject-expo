/**
 * 判断空对象
 * @param obj
 */
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SecureStoreOptions } from "expo-secure-store/src/SecureStore";

export function checkNullObj(obj: Object) {
  if (typeof obj !== "object") {
    return true;
  }
  return Object.keys(obj).length === 0;
}

export async function deleteItemAsync(key: string) {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync("user");
  }
}

export async function setItemAsync(key: string, value: string, option?: SecureStoreOptions) {
  if (Platform.OS !== "web") {
    await SecureStore.setItemAsync(key, value, option);
  }
}
