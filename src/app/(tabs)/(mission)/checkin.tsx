import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { getDailyVocab, vocabDailyList } from '@/entities/mission/mock/vocab';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { TouchableOpacity } from '@/shared/ui';
import { Text } from '@/shared/ui';
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { SvgIcon } from '@/shared/ui/SvgIcon';
const pool = [...vocabDailyList];
const data = getDailyVocab(pool, 10); // 10 vocab cố định trong ngày theo timezone Asia/Ho_Chi_Minh

export type VocabDaily = {
  id?: string;
  vocaulary?: string;
  meaning?: string;
  ipa?: string;
  Example?: string;
};

const CARD_HEIGHT = 395;

const CheckinScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  const [Current, setCurrent] = useState<number>(0);
  useHideTabBar();

  const total = data.length;
  const handleNext = () => {
    setCurrent((prev) => {
      if (prev < total - 1) return prev + 1;
      return prev;
    });
  };

  const handleBack = () => {
    setCurrent((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  const anim = useRef(new Animated.Value(0)).current;

  const [_, setIsFlipped] = useState(false);

  const rotateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const rotateYBack = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const flipToBack = () => {
    setIsFlipped(true);
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const flipToFront = () => {
    setIsFlipped(false);
    Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const item = data[Current] ?? { vocaulary: '-', ipa: '-', meaning: '-' };

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <View className="w-full items-center pt-[2rem]">
          <Text className="font-baloo text-2xl dark:text-navbar-active">Daily Mission</Text>
        </View>
      }
      Body={
        <View className="flex-1 items-center justify-center px-5">
          <View className="w-[280px]">
            <Text className="text-center text-[20px]">
              Học thuộc 10 từ vựng để điểm danh hằng ngày!
            </Text>
          </View>

          {/* Card wrapper: dùng TouchableOpacity để bắt onPressIn/onPressOut */}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={flipToBack} // khi ấn giữ -> flip to back
            onPressOut={flipToFront} // khi thả -> flip to front
            style={{ height: CARD_HEIGHT }}
            className="mt-2 w-full flex-col justify-between rounded-3xl border bg-white px-3 pt-2"
          >
            <View className="flex-row justify-between">
              <Text className="text-lg">
                {Current + 1}/{data.length}
              </Text>
              <Text className="text-lg">Vocabulary</Text>
              <SvgIcon name="speaker" size={32} color="#1F2937" />
            </View>

            <View className="w-full items-center justify-center gap-4" pointerEvents="none">
              {/* Front side */}
              <Animated.View
                style={[
                  styles.cardFace,
                  {
                    transform: [{ rotateY }],
                  },
                ]}
              >
                <Text className="m-0 p-0 text-4xl font-bold">{item.vocaulary}</Text>
                <Text className="m-0 p-0 text-3xl">{item.ipa}</Text>
              </Animated.View>

              {/* Back side */}
              <Animated.View
                className={`gap-3`}
                style={[
                  styles.cardFace,
                  styles.cardBack,
                  {
                    transform: [{ rotateY: rotateYBack }],
                  },
                ]}
              >
                <Text className="m-0 p-0 text-center text-3xl">{item.meaning}</Text>

                <View className="mt-2 px-4">
                  <Text className="text-center text-xl">{item.Example}</Text>
                </View>
              </Animated.View>
            </View>

            <View className="w-full flex-row justify-between pb-2">
              <TouchableOpacity className="rounded-xl bg-primary p-3 px-5" onPress={handleBack}>
                <SvgIcon name="arrowleft" size={16} />
              </TouchableOpacity>
              <Text className="flex-1 pt-2 text-center dark:text-black">Hold to flip</Text>
              <TouchableOpacity
                style={{ transform: [{ rotate: '180deg' }] }}
                className="rounded-xl bg-primary p-3 px-5"
                onPress={handleNext}
              >
                <SvgIcon name="arrowleft" size={16} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      }
      Bottom={
        <>
          <AdBanner />
          {Current === 9 && (
            <View className="px-3 pb-2">
              <SecondaryButton
                title={'Check now'}
                className={`my-2`}
                textStyle={`uppercase`}
                onPress={() => {
                  router.replace('/(tabs)/(mission)/exercise');
                }}
              />
            </View>
          )}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  cardFace: {
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    height: CARD_HEIGHT - 120,
    width: '100%',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default withErrorBoundary(withDeviceLayout(CheckinScreen));
