import { Platform } from 'react-native';
import { moderateScale as mScale } from 'react-native-size-matters';

export const moderateScale = (size: number, factor?: number): number => {
  if (Platform.OS === 'web') {
    return mScale(size, 0.1);
  }
  return mScale(size, factor);
};
