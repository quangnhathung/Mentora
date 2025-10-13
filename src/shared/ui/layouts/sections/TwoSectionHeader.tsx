import React from 'react';
import { ScrollView, type StyleProp, type ViewStyle } from 'react-native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { FocusAwareStatusBar, View } from '@/shared/ui';
import Screen from '@/shared/ui/screen';

export const TwoSectionHeader: React.FC<{
  edges?: Edge[] | undefined;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  Header: React.ReactNode;
  Body: React.ReactNode;
}> = ({
  Header,
  Body,
  edges,
  scrollable,
  className,
  headerClassName = '',
  containerClassName = '',
  style,
}) => {
  const insets = useSafeAreaInsets();
  const Container: React.ElementType = scrollable ? ScrollView : View;
  const scrollProps = scrollable
    ? {
        contentContainerStyle: { flexGrow: 1 },
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: 'handled',
        showsHorizontalScrollIndicator: false,
      }
    : {};
  return (
    <Screen edges={edges} className={className} style={style}>
      {/* <StatusBar style="light" backgroundColor="blue" /> */}
      <FocusAwareStatusBar />
      <View className={`flex-1 ${containerClassName}`}>
        <View className={`${headerClassName}`}>{Header}</View>
        <Container className={`flex-1`} {...scrollProps}>
          <View className={`flex-1`}>
            {Body}
            <View style={{ height: insets.bottom + 50 }} />
          </View>
        </Container>
      </View>
    </Screen>
  );
};
