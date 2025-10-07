import React from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { View } from 'react-native';

import { Button, Text } from '@/shared/ui';

// Fallback chung, vẫn gõ kiểu chuẩn
const FallbackUI: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <View className={`flex-1 items-center justify-center`}>
    <Text>{error.message}</Text>
    <Button
      className={`rounded-xl bg-primary`}
      label="Reset"
      onPress={resetErrorBoundary}
    />
  </View>
);

export function withErrorBoundary<
  P extends Record<string, any> = Record<string, any>,
>(
  Wrapped: React.ComponentType<P>,
  fallback: React.FC<FallbackProps> = FallbackUI
) {
  const ComponentWithBoundary: React.FC<P> = (props) => (
    <ErrorBoundary FallbackComponent={fallback}>
      {/* props bây giờ “chắc chắn” chứa IntrinsicAttributes  */}
      <Wrapped {...props} />
    </ErrorBoundary>
  );

  ComponentWithBoundary.displayName = `withErrorBoundary(${
    Wrapped.displayName || Wrapped.name || 'Component'
  })`;

  return ComponentWithBoundary;
}
