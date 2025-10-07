import { BlurView } from 'expo-blur'; // or 'react-native-blur' for React Native projects
import { type ReactNode, useState } from 'react';
import React from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
type BlurredProps = {
  intensity?: number;
  tint?: 'light' | 'dark';
  children: ReactNode;
};

export const Blurred = ({
  intensity = 10,
  tint = 'light',
  children,
}: BlurredProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <View onLayout={onLayout}>
      {children}
      <BlurView
        intensity={intensity}
        tint={tint}
        style={{
          position: 'absolute',
          width: size.width,
          height: size.height,
        }}
      />
    </View>
  );
};
