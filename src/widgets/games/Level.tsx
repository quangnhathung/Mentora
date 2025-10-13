import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import { type GameInfo } from '@/entities/games/types/types';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image, Text, View } from '@/shared/ui';
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { type RadioButtonHandle } from '@/shared/ui/animations/RiveAnimation';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import RadioButton from '@/shared/ui/RadioButton';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { SvgIcon } from '@/shared/ui/SvgIcon';

type Props = {
  data: GameInfo;
};

const levels = [
  { label: 'Easy', value: 5 },
  { label: 'Medium', value: 10 },
  { label: 'Hard', value: 15 },
];

export const ChooseLevel = ({ data }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);

  const refs = [
    useRef<RadioButtonHandle>(null),
    useRef<RadioButtonHandle>(null),
    useRef<RadioButtonHandle>(null),
  ];

  const handlePlay = () => {
    if (!selected) return;
    router.push({
      pathname: '/(games)/[id]' as any,
      params: {
        id: data.id,
        level: String(selected),
        name: data.name,
        desc: data.desc,
        image: data.image,
      },
    });
  };

  const moderateSize = vars({
    '--c-150': `${moderateScale(150)}px`,
    '--c-50': `${moderateScale(50)}px`,
  });

  return (
    <View className="my-12 items-center justify-center gap-3">
      <GradientView
        colors={['#F8AAD3', '#CAB9FC']}
        containerClassName="w-full rounded-xl"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={moderateSize}
        pointerEvents="box-none"
      >
        <View className="w-full items-center py-2 pt-4">
          <View className="size-[170px] items-center justify-center overflow-hidden rounded-full p-4">
            <GradientView
              colors={['#1F2937', '#5A6D93']}
              style={StyleSheet.absoluteFillObject}
              containerClassName="absolute inset-0 px-2"
              className="rounded-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light"
              pointerEvents="box-none"
            />
            <Image source={data.image} className="size-4/5 rounded-full" />
          </View>
        </View>

        <View className="w-full justify-start gap-3 px-3 py-5">
          {levels.map((level, idx) => (
            <RadioButton
              key={level.value}
              ref={refs[idx]}
              selected={selected === level.value}
              onChoose={() => setSelected(level.value)}
              className="relative h-[--c-50] w-full"
            >
              <View className="size-full items-center justify-center">
                <Text className="font-bevietnampro text-lg font-bold">{level.label}</Text>
              </View>
              <View pointerEvents="none" className="absolute inset-0 h-full justify-center">
                <View className="flex-row self-start rounded-2xl bg-green-500 px-3 py-1">
                  <SvgIcon className="mr-1" name="star" size={15} />
                  <Text className="font-bevietnampro dark:text-white">{level.value}</Text>
                </View>
              </View>
            </RadioButton>
          ))}
        </View>
        <View className="px-3">
          <SecondaryButton
            title={'play'}
            className={`my-2`}
            textStyle={`uppercase`}
            onPress={handlePlay}
          />
        </View>
      </GradientView>
      <AdBanner
        adClient="ca-pub-3940256099942544"
        adSlot="6300978111"
        adFormat="auto"
        adTest={true}
        style={{ width: '100%' }}
        className="border-2"
      />
    </View>
  );
};
