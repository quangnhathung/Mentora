// components/Screen.tsx
import { ImageBackground } from 'expo-image';
import { cssInterop } from 'nativewind';
import React, { type PropsWithChildren } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';
import Toast, {
  BaseToast,
  type BaseToastProps,
} from 'react-native-toast-message';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';

type ScreenProps = PropsWithChildren<{
  /**
   * Cạnh nào cần chừa? Mặc định chừa top + bottom
   *   – Onboarding full-image => edges = ["bottom"] để chiếm status bar
   *   – Scroll screen          => edges = ["top","bottom"]
   */
  edges?: Edge[];
  className?: string;
  style?: StyleProp<ViewStyle>;
}>;

/*
  1. Create the config
*/
const BaseToastCustom = cssInterop(BaseToast, {
  className: 'style',
  contentContainerClassname: 'contentContainerStyle',
  text1Classname: 'text1Style',
  text2Classname: 'text2Style',
});
const toastConfig = {
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToastCustom
      {...props}
      className={`rounded-lg border-l-red bg-background-dark-light`}
      contentContainerClassname={`rounded-r-lg bg-background-dark-light`}
      text1Classname={`font-bevietnampro font-base text-white`}
      text2Classname={`font-bevietnampro font-base text-white`}
    />
  ),
};

export default function Screen({
  children,
  edges = ['top', 'bottom'],
  className,
  style,
}: ScreenProps) {
  // Nếu muốn padding tay thủ công:
  // const insets = useSafeAreaInsets();

  const ErrorFallback: React.FC<FallbackProps> = ({
    error,
    resetErrorBoundary,
  }) => (
    <View className={`items-center justify-center`}>
      <Text>{error.message}</Text>
      <Button label="Thử lại" onPress={resetErrorBoundary} />
    </View>
  );
  const isWeb = Platform.OS === 'web';
  const isTransparent = isWeb;

  return (
    <SafeAreaView
      edges={edges}
      // style={style}
      style={[isTransparent ? { backgroundColor: 'transparent' } : null, style]}
      className={twMerge(
        `flex-1 ${Platform.OS === 'web' ? '' : 'bg-background-dark'}`,
        className
      )}
    >
      {Platform.OS !== 'web' && (
        <ImageBackground
          source={require('@assets/images/pngs/bg-mobile-white.png')}
          contentFit={'cover'}
          transition={0}
          pointerEvents="none"
          style={StyleSheet.absoluteFillObject}
          imageStyle={{ resizeMode: 'repeat', opacity: 0.07 }}
        />
      )}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => console.log('reset ErrorBoundary')} // hoặc reload dữ liệu
      >
        {children}
      </ErrorBoundary>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
