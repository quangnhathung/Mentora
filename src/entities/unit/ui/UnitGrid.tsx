import PathLeftSvg from '@assets/images/svgs/path-left.svg';
import PathRightSvg from '@assets/images/svgs/path-right.svg';
import StageActiveSvg from '@assets/images/svgs/stage-active.svg';
import StageInActiveSvg from '@assets/images/svgs/stage-inactive.svg';
import StageInProgressSvg from '@assets/images/svgs/stage-inprogress.svg';
import { vars } from 'nativewind';
import { useMemo } from 'react';
import { Platform } from 'react-native';

import { type Unit } from '@/entities/unit/types';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Image, Pressable, Text, View } from '@/shared/ui';

type UnitGridProp = {
  data: Unit;
  direction?: string;
  first?: boolean;
  last?: boolean;
  handleSelect: (unit: Unit) => void;
};

export const UnitGrid = ({ data = {}, direction, first, last, handleSelect }: UnitGridProp) => {
  const complete = data.lessons!.every((lesson) => lesson.state === 'complete');
  const inProgress = data.lessons!.some((lesson) => lesson.state === 'inprogress');

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-unit': `${moderateScale(115)}px`,
        '--s-unit-image': `${moderateScale(70)}px`,
      }),
    []
  );

  return (
    <View className={`flex-col`}>
      {first && Platform.OS === 'web' && <View className={`h-[50px] w-full`}></View>}
      <View
        className={`w-full ${direction === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
        style={moderateSize}
      >
        <View className={`w-[--s-unit] flex-col pb-4`}>
          <Pressable
            className={`w-full`}
            onPress={() => (complete || inProgress) && handleSelect(data)}
          >
            <View className={`w-[--s-unit]`}>
              <View
                className="absolute bottom-8 left-6 z-10"
                // style={[{ transform: [{ translateX: -Math.floor(lectureImgSize / 2) }] }]}
              >
                <Image
                  source={data.image}
                  className={`z-10 size-[--s-unit-image] rounded-xl border-2 border-white`}
                />
              </View>

              {complete ? (
                <StageActiveSvg width={moderateScale(113)} height={moderateScale(76)} />
              ) : inProgress ? (
                <StageInProgressSvg width={moderateScale(113)} height={moderateScale(76)} />
              ) : (
                <StageInActiveSvg width={moderateScale(113)} height={moderateScale(76)} />
              )}
            </View>
          </Pressable>
          <View className="mt-1 w-full flex-col items-center justify-center gap-1">
            <View className="w-full flex-col items-center justify-center">
              <Text className="text-center font-bevietnampro-medium text-xxs dark:text-white-dark">
                {data.tags?.join(' - ')}
              </Text>
              <Text className="text-center font-bevietnampro-medium text-sm dark:text-white">
                {data.name}
              </Text>
            </View>
            <View className="w-full flex-row items-center justify-center gap-1">
              {data.lessons!.map((item, i) => (
                <View
                  key={`lessons-${i}`}
                  className={`size-2 rounded-full ${item.state === 'complete' ? 'bg-secondary' : 'bg-white-dark'}`}
                />
              ))}
            </View>
          </View>
        </View>
        {!last && (
          <View
            className={`flex-1 px-1 ${direction === 'left' ? 'items-start justify-center' : 'items-end justify-center'}`}
          >
            <View className={`${Platform.OS === 'web' ? `w-[90%]` : `w-[90%]`}`}>
              {direction === 'left' ? (
                <PathRightSvg
                  className={`size-full`}
                  color={complete ? colors.secondary.DEFAULT : colors.gray.DEFAULT}
                />
              ) : (
                <PathLeftSvg
                  className={`size-full`}
                  color={complete ? colors.secondary.DEFAULT : colors.gray.DEFAULT}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
