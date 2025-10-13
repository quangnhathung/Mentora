import React from 'react';
import { ScrollView, type StyleProp, type ViewStyle } from 'react-native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { FocusAwareStatusBar, View } from '@/shared/ui';
import Screen from '@/shared/ui/screen';

export const ThreeSection: React.FC<{
  edges?: Edge[] | undefined;
  className?: string;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  Header: React.ReactNode;
  Body: React.ReactNode;
  Bottom: React.ReactNode;
}> = ({ Header, Body, Bottom, edges, scrollable, className, style }) => {
  const insets = useSafeAreaInsets();
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
      <FocusAwareStatusBar />
      <View className="flex-1 pt-1">
        <View className={``}>{Header}</View>
        <Container className={`flex-1 px-4`} {...scrollProps}>
          <View className={`flex-1 pb-4`}>{Body}</View>
        </Container>
        <View className={``}>{Bottom}</View>
      </View>
      <View style={{ height: insets.bottom + 50 }} />
    </Screen>
  );
};
