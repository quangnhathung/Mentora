import React from 'react';

import { View } from '@/shared/ui';

export const Web: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View className="flex-1 items-center justify-center">
    <View className={`size-full max-w-screen-md`}>{children}</View>
  </View>
);
