import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? T extends Lowercase<T>
    ? `${T}${SnakeCase<U>}`
    : `_${Lowercase<T>}${SnakeCase<U>}`
  : S;

export type ToSnake<T> = {
  [K in keyof T as SnakeCase<Extract<K, string>>]: T[K];
};
