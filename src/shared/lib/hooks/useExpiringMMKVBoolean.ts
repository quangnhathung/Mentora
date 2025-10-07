import { useEffect } from 'react';
import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '@/shared/lib/storage';

/**
 * Hook boolean với TTL tự gắn khi gọi setter.
 * @param key         – tên key dynamic
 * @param defaultTTL  – thời gian TTL (ms); =0 để vĩnh viễn
 */
export function useExpiringMMKVBoolean(
  key: string,
  defaultTTL: number = 1000 * 60 * 60 * 1 // 1 hours
): [boolean | undefined, (value: boolean) => void] {
  const expiryKey = `${key}-expiresAt`;
  const [value, setRawValue] = useMMKVBoolean(key);

  // On mount: nếu đã có giá trị và chưa có expiry, hoặc expiry hết hạn, xử lý
  useEffect(() => {
    const exp = storage.getNumber(expiryKey);
    // 1) Nếu quá hạn thì reset về false và xóa metadata
    if (exp != null && exp > 0 && Date.now() > exp) {
      setRawValue(false);
      storage.delete(key);
      storage.delete(expiryKey);
    }
    // 2) Nếu có data mà chưa từng gắn expiry (ví dụ migrate từ cũ), thì gắn ngay
    else if (value && (exp == null || exp <= 0)) {
      storage.set(expiryKey, Date.now() + defaultTTL);
    }
  }, [key, defaultTTL, expiryKey, setRawValue, value]);

  // Setter wrapper: mỗi lần setValue(v) → luôn gắn TTL mặc định
  const setValue = (v: boolean) => {
    setRawValue(v);
    if (v && defaultTTL > 0) {
      storage.set(expiryKey, Date.now() + defaultTTL);
    } else {
      // v=false hoặc defaultTTL=0 → vĩnh viễn hoặc xóa flag
      storage.delete(expiryKey);
    }
  };

  return [value, setValue];
}
