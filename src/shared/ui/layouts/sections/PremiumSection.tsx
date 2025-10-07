import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import {
  ScrollView,
  StatusBar,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { twMerge } from 'tailwind-merge';

import { Text, View } from '@/shared/ui';

import { GradientView } from '../../GradientView/GradientView';

export const PremiumSection: React.FC<{
  edges?: Edge[] | undefined;
  className?: string;
  scrollable?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
  Body: React.ReactNode;
  note?: string;
  Bottom: React.ReactNode;
}> = ({ Body, Bottom, scrollable, className, style, edges, title, note }) => {
  const Container: React.ElementType = scrollable ? ScrollView : View;
  const scrollProps = scrollable
    ? {
        contentContainerStyle: { flexGrow: 1 },
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
      }
    : {};
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-60': `${moderateScale(60)}px`,
        '--s-270': `${moderateScale(270)}px`,
      }),
    []
  );
  return (
    <>
      {/* Cho phép status bar trong suốt */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <SafeAreaView
        edges={edges ?? ['left', 'right']} // bỏ 'top' để đè lên status bar
        style={style}
        className={twMerge('flex-1', className)}
      >
        <GradientView
          colors={['primary-dark', 'primary', 'primary-light']}
          containerClassName={`relative`}
          className={`size-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          pointerEvents="box-none"
        >
          <View className="flex-1 pt-14">
            <View
              className={`w-full flex-row items-center justify-center py-2`}
              style={moderateSize}
            >
              <View className={`w-full items-center justify-center`}>
                <Text className="font-baloo text-2xl">Premium</Text>
              </View>
            </View>
            <View className="pt-3">
              <Text className="text-center font-baloo text-2xl">{title}</Text>
              {note && (
                <Text className="text-center font-bevietnampro text-base dark:text-gray-300">
                  {note}
                </Text>
              )}
            </View>

            <Container className="flex-1" {...scrollProps}>
              <View className="flex-1 pb-3">{Body}</View>
            </Container>
            <View className="w-full">
              <View className="h-32 rounded-t-3xl bg-background-dark p-4">
                {Bottom}
              </View>
            </View>
          </View>
        </GradientView>
      </SafeAreaView>
    </>
  );
};
