/* src/ReactotronConfig.ts */
import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotronZustand from 'reactotron-plugin-zustand';
import Reactotron from 'reactotron-react-native';

import { Env } from '@/shared/lib/env';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { useConfigStore } from '@/shared/lib/storage/config/useConfigStore';

const host = Env.REACTOTRON_IP; // IP máy tính chạy Reactotron; iOS sim dùng 'localhost'

Reactotron.setAsyncStorageHandler?.(AsyncStorage) // để Reactotron lưu preference vào AsyncStorage
  .configure({ name: 'Mahtutor', host, port: 9099 }) // hiển thị phía desktop
  .useReactNative({
    asyncStorage: { ignore: ['persist:root'] }, // ẩn khoá Redux persist dài
    networking: { ignoreUrls: /symbolicate/ },
  })
  .use(
    reactotronZustand({
      stores: [
        { name: 'configs', store: useConfigStore },
        { name: 'auth', store: useAuthStore },
      ],
      omitFunctionKeys: true,
    })
  ) // <-- plugin Zustand
  .connect();

declare global {
  // giúp gõ `console.tron.log(...)`
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      console: typeof global.console & { tron: typeof Reactotron };
    }
  }
}
// @ts-ignore
if (__DEV__) global.console.tron = Reactotron;

export default Reactotron;
