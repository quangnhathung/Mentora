import React from 'react';

import { View } from '@/shared/ui';

export const Tablet: React.FC<React.PropsWithChildren> = ({ children }) => (
  <View className="flex-1">{children}</View>
);
