// hooks/useGoogleCode.ts
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

export function useOauthCode() {
  const [code, setCode] = useState<string | null>(null);

  /** helper: trích query param "code" */
  const extract = (url: string | null) => {
    if (!url) return;
    const { queryParams } = Linking.parse(url);
    if (typeof queryParams?.code === 'string') setCode(queryParams.code);
  };

  // 1️⃣ lắng nghe khi app đang mở
  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => extract(url));
    return () => sub.remove();
  }, []);

  // 2️⃣ kiểm tra URL khởi động (cold start)
  useEffect(() => {
    (async () => {
      const initial = await Linking.getInitialURL();
      extract(initial);
    })();
  }, []);

  return code; // null cho đến khi có mã
}
