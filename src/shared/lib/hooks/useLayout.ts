import { Platform, useWindowDimensions } from 'react-native';

import { BREAKPOINTS } from '@/shared/constants/BreakPoints';

export type Layout = 'mobile-portrait' | 'mobile-landscape' | 'tablet' | 'web';

export const useLayout = (): Layout => {
  const { width, height } = useWindowDimensions();

  if (Platform.OS === 'web' && width >= BREAKPOINTS.web) return 'web';
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  if (width > height) return 'mobile-landscape';
  return 'mobile-portrait';
};
