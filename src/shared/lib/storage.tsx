import { MMKV } from 'react-native-mmkv';
import { type StateStorage } from 'zustand/middleware';

export const storage = new MMKV({
  id: 'app', // tuỳ chọn – tách nhiều instance nếu cần
  // encryptionKey: '🔑', // tuỳ chọn – mã hoá
});

export const zustandMMKVStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export const zustandMMKVStorageWithTTL = {
  setItem: (name: string, value: string, ttl = 1000 * 60 * 60) => {
    const item = { value, expiry: Date.now() + ttl }; // expired 1 hour
    storage.set(name, JSON.stringify(item));
  },
  getItem: (name: string) => {
    const str = storage.getString(name);
    if (!str) return null;
    try {
      const item = JSON.parse(str);
      if (typeof item.expiry === 'number' && Date.now() > item.expiry) {
        storage.delete(name);
        return null;
      }
      return item.value;
    } catch {
      return str; // fallback nếu dữ liệu cũ không bọc TTL
    }
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch (e) {
    console.error(`getItem: lỗi khi parse JSON cho key="${key}"`, e);
    return null;
  }
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}
