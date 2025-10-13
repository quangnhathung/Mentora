import React from 'react';

import { View } from '@/shared/ui';

export const MobilePortrait: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View className="flex-1">{children}</View>
);
