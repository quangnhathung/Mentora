import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, FocusAwareStatusBar, type ProgressBarRef } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';

type ExerciseHeaderProps = {
  currentStep: number;
  maxStep: number;
  containerClassName?: string;
  backBtnClassName?: string;
};

export const ExerciseHeader = ({
  currentStep,
  maxStep,
  containerClassName,
}: ExerciseHeaderProps) => {
  const router = useRouter();
  // const { profile } = useUserStore();

  const routeBack = () => {
    router.back();
  };

  const progressRef = useRef<ProgressBarRef>(null);

  useEffect(() => {
    if (progressRef.current) {
      const percentage = Math.round((currentStep / maxStep) * 100);
      progressRef.current.setProgress(percentage);
    }
  }, [currentStep, maxStep]);

  return (
    <>
      <SafeAreaView edges={['top']}>
        <FocusAwareStatusBar />
        <View
          className={`w-full flex-row items-center justify-between px-4 pb-4 pt-6 ${containerClassName} `}
        >
          <BackButton color={colors.white.DEFAULT} className={`w-[--s-24]`} onPress={routeBack} />
          {/* <ProgressBar ref={progressRef} className="w-2/3" /> */}
          {/* <View className={`flex-row items-center gap-1.5`}>
            <SvgIcon name="heart" />
            {profile ? (
              <Text className={`font-bevietnampro-bold text-base text-white`}>
                {profile.progress?.currentHealth || 0}
              </Text>
            ) : (
              <ActivityIndicator />
            )}
          </View> */}
        </View>
      </SafeAreaView>
    </>
  );
};
