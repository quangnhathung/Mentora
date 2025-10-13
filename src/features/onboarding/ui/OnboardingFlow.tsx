import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { useOnboardingStep } from '@/features/onboarding/model/useOnboardingStep';
import { type Onboarding } from '@/features/onboarding/types';
import { useIsFirstTime } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { useConfigStore } from '@/shared/lib/storage/config/useConfigStore';
import { colors, Text, View } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import BottomBorder from '@/shared/ui/BottomBorder';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import SelectableList from '@/shared/ui/List/SelectableList';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import CatWithFlagSvg from '@/shared/ui/svg/CatWithFlagSvg';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

type OnboardingFlowProps = {
  stepsData: Onboarding[]; // KHÔNG dùng any
  isLoading: boolean;
  isError: boolean;
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ stepsData, isLoading, isError }) => {
  const { current, currentStep, selection, setSelection, next, prev } = useOnboardingStep();
  const [_, setIsFirstTime] = useIsFirstTime();

  const router = useRouter();
  const { setConfig } = useConfigStore();

  const routeBack = () => {
    if (currentStep > 1) prev();
    else router.back();
  };

  const routeNext = () => {
    if (currentStep < stepsData.length) {
      next();
    } else {
      setConfig(selection);
      setIsFirstTime(false);
      router.push(`/(tabs)`);
    }
  };

  const handleSelect = (idx: number) => {
    const lang = stepsData[currentStep - 1].choices[idx].id || 0;
    setSelection(current, lang);
    // setLanguage(lang);
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-step': `${moderateScale(9)}px`,
        '--s-20': `${moderateScale(20)}px`,
        '--s-150': `${moderateScale(150)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={['top', 'bottom']}
      className={``}
      style={moderateSize}
      Header={
        <View className={`w-full py-2`}>
          <View className={`flex-row items-center justify-between px-3`}>
            <BackButton
              size={`--h-20`}
              iconSize={20}
              color={colors.white.DEFAULT}
              className={`absolute left-0`}
              onPress={routeBack}
            />
            <View className={`h-full flex-1 flex-row items-center justify-center gap-3 px-5`}>
              {stepsData.map((_: { toString: () => React.Key | null | undefined }, i: number) => (
                <BottomBorder className={`border-custom-3-light flex-1 rounded-full`}>
                  <View
                    key={`step-${i}`}
                    className={clsx(
                      'h-[--s-step] rounded-full',
                      currentStep >= i + 1 ? 'bg-primary' : 'bg-white'
                    )}
                  />
                </BottomBorder>
              ))}
            </View>
          </View>
          <TextGradient
            className={`from-primary via-white to-primary py-2 text-center font-baloo text-xl uppercase tracking-widest`}
            content={stepsData[currentStep - 1]?.screenName}
            colors={['primary', 'white', 'primary']}
            locations={[0, 0.47, 1]}
          />
        </View>
      }
      Body={
        <View className="flex-1 items-center justify-center">
          <CatWithFlagSvg className={`h-[--s-150] w-full`} />
          <View className={`flex-1 self-stretch py-4`}>
            {stepsData[currentStep - 1]?.title && (
              <Text className={`text-4 py-2 font-bevietnampro text-white`}>
                {stepsData[currentStep - 1]?.title}
              </Text>
            )}
            <SelectableList
              // key={`step-${current}`}
              itemClassName={`flex-1`}
              value={selection[current]}
              isLoading={isLoading}
              isError={isError}
              data={stepsData[currentStep - 1]}
              handleSelect={handleSelect}
            />
          </View>
        </View>
      }
      Bottom={
        <>
          <PrimaryButton
            title="Next"
            disabled={selection[current] === -1}
            className={`my-2`}
            textStyle={`uppercase`}
            onPress={routeNext}
          />
        </>
      }
    />
  );
};

export default OnboardingFlow;
