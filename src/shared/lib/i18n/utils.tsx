import type { TOptions } from 'i18next';
import i18n from 'i18next';
import memoize from 'lodash.memoize';
import { useCallback, useEffect, useState } from 'react';
import { DevSettings, I18nManager, Platform } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import RNRestart from 'react-native-restart';

import { storage } from '../storage';
import type { Language, resources } from './resources';
import type { RecursiveKeyOf } from './types';

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const LOCAL = 'local';

const isWeb = Platform.OS === 'web';

const readBrowserLanguage = (): Language | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return (window.localStorage?.getItem(LOCAL) as Language | null) ?? undefined;
  } catch {
    return undefined;
  }
};

export const getLanguage = () => {
  if (isWeb) {
    return readBrowserLanguage();
  }
  return storage.getString(LOCAL) as Language | undefined;
};

const resolveCacheKey = (key: TxKeyPath, options?: TOptions) => {
  const optionKey = options ? JSON.stringify(options) : '';
  return `${i18n.language}:${key}:${optionKey}`;
};

const translateImpl = (key: TxKeyPath, options?: TOptions) =>
  (i18n.t(key, options) as unknown as string) ?? '';

export const translate = memoize(translateImpl, resolveCacheKey);

const clearTranslateCache = () => {
  const cache = translate.cache as { clear?: () => void };
  cache.clear?.();
};

export const changeLanguage = (lang: Language) => {
  if (isWeb) {
    try {
      window.localStorage?.setItem(LOCAL, lang);
    } catch {
      // ignore storage write issues on web
    }
  }

  i18n.changeLanguage(lang);
  clearTranslateCache();

  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    if (__DEV__) DevSettings.reload();
    else RNRestart.restart();
  } else if (Platform.OS === 'web') {
    window.location.reload();
  }
};

export const useSelectedLanguage = () => {
  const [nativeLanguage, setNativeLanguage] = useMMKVString(LOCAL);
  const [browserLanguage, setBrowserLanguage] = useState<Language | undefined>(() =>
    readBrowserLanguage()
  );

  useEffect(() => {
    if (!isWeb) {
      return undefined;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOCAL) {
        setBrowserLanguage((event.newValue as Language | null) ?? undefined);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (isWeb) {
        try {
          window.localStorage?.setItem(LOCAL, lang);
        } catch {
          // ignore storage errors
        }
        setBrowserLanguage(lang);
      } else {
        setNativeLanguage(lang);
      }

      changeLanguage(lang);
    },
    [setNativeLanguage]
  );

  const languageSource = isWeb ? (browserLanguage ?? nativeLanguage) : nativeLanguage;
  const language = (languageSource ?? 'en') as Language;

  return { language, setLanguage };
};
