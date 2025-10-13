import ar from '@/shared/lib/i18n/translations/ar.json';
import en from '@/shared/lib/i18n/translations/en.json';
import vi from '@/shared/lib/i18n/translations/vi.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  vi: {
    translation: vi,
  },
};

export type Language = keyof typeof resources;
