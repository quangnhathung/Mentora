import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandMMKVStorage } from '@/shared/lib/storage';

import type { LastLogin, TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  lastLogin: Partial<LastLogin>;
  doSignIn: (data: TokenType) => void;
  setLastLogin: (payload: LastLogin) => void;
  doSignOut: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        status: 'signOut',
        token: null,
        lastLogin: {},
        doSignIn: (token) => {
          setToken(token);
          set({ status: 'signIn', token });
        },
        doSignOut: () => {
          removeToken();
          set({ status: 'signOut', token: null });
        },
        setLastLogin: (payload: LastLogin) => {
          set({
            lastLogin: {
              provider: payload.provider,
              email: payload.email,
            },
          });
        },
        hydrate: () => {
          try {
            const userToken = getToken();
            if (userToken !== null) {
              get().doSignIn(userToken);
            } else {
              get().doSignOut();
            }
          } catch (e) {
            // catch error here
            // Maybe sign_out user!
          }
        },
      })),
      {
        name: 'auth',
        storage: createJSONStorage(() => zustandMMKVStorage),
        version: 1,
      }
    )
  )
);

if (__DEV__) {
  // track toàn bộ store, hoặc từng slice
  // @ts-ignore
  console.tron?.trackZustand?.(useAuthStore);
}

export const hydrateAuth = () => useAuthStore.getState().hydrate();
