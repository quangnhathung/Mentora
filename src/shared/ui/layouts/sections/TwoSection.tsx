import React from 'react';
import { ScrollView, type StyleProp, type ViewStyle } from 'react-native';
import { type Edge } from 'react-native-safe-area-context';

import { View } from '@/shared/ui';
import Screen from '@/shared/ui/screen';

export const TwoSection: React.FC<{
  edges?: Edge[] | undefined;
  className?: string;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  Body: React.ReactNode;
  Bottom: React.ReactNode;
}> = ({ Body, Bottom, edges, scrollable, className, style }) => {
  const Container: React.ElementType = scrollable ? ScrollView : View;
  const scrollProps = scrollable
    ? {
        contentContainerStyle: { flexGrow: 1 },
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
      }
    : {};
  return (
    <Screen edges={edges} className={className} style={style}>
      <View className="flex-1 px-4 pt-2">
        <Container className={`flex-1`} {...scrollProps}>
          <View className={`flex-1 pb-2`}>{Body}</View>
        </Container>
        <View className={``}>{Bottom}</View>
      </View>
    </Screen>
  );
};
