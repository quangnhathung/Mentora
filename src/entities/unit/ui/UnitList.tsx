import Lock from '@assets/images/svgs/lock.svg';
import { vars } from 'nativewind';
import { memo, useMemo } from 'react';

import { type Unit } from '@/entities/unit/types';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Image, Pressable, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import LabelSvg from '@/shared/ui/svg/Label';
import { SegmentedCircle } from '@/shared/ui/svg/SegmentedCircle';

type UnitRootProp = {
  data: Unit;
  children: React.ReactNode;
  handleSelect: (unit: Unit) => void;
};

const UnitMarker = memo(({ data }: { data: Unit }) => {
  const complete = data.lessons!.every((lesson) => lesson.state === 'complete');
  const inProgress = data.lessons!.some((lesson) => lesson.state === 'inprogress');

  return (
    <View className={`w-[--w-unit-marker] flex-col items-center justify-center`}>
      <View
        className={`size-[--s-unit-marker-size] rounded-lg ${complete ? 'bg-secondary' : inProgress ? 'bg-primary' : 'bg-white-dark'}`}
      />
    </View>
  );
});

const UnitImage = memo(({ data }: { data: Unit }) => {
  const complete = data.lessons!.every((lesson) => lesson.state === 'complete');
  const inProgress = data.lessons!.some((lesson) => lesson.state === 'inprogress');
  const inProgressIndex = data.lessons!.findIndex((lesson) => lesson.state === 'inprogress');

  return (
    <SegmentedCircle
      size={moderateScale(85)}
      segments={data.lessonsCount!}
      gapAngle={20}
      strokeWidth={5}
      color={inProgress || complete ? colors.secondary.DEFAULT : colors.gray.DEFAULT}
      highlightIndex={inProgress ? inProgressIndex : -1}
      highlightColor={colors.primary.DEFAULT}
    >
      {data.image && (
        <Image
          className={`size-full rounded-full ${complete || inProgress ? 'opacity-1' : 'opacity-50'}`}
          source={data.image}
        />
      )}
    </SegmentedCircle>
  );
});

const UnitInfo = memo(({ data }: { data: Unit }) => {
  const complete = data.lessons!.every((lesson) => lesson.state === 'complete');
  const inProgress = data.lessons!.some((lesson) => lesson.state === 'inprogress');

  return (
    <BottomBorder className={`border-custom-5 flex-1 rounded-2xl`}>
      <View
        className={`flex-1 rounded-xl ${complete || inProgress ? 'bg-background-dark-light' : 'bg-gray'} p-3`}
      >
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-xxs dark:text-white-dark">{data.tags?.join(' - ')}</Text>
        </View>
        <Text numberOfLines={2} className="h-10">
          {data.name}
        </Text>
        <View className={`w-full flex-row items-center justify-between`}>
          <Text numberOfLines={1} className={`text-xs`}>
            {data.desc}
          </Text>
        </View>
      </View>
      {!complete && !inProgress && (
        <Lock className={`z-9 absolute right-3 top-3`} color={colors.white.DEFAULT} />
      )}
      {(inProgress || complete) && (
        <LabelSvg
          className={`z-999 absolute -top-1 right-2`}
          value={30}
          label={translate('common.exp')}
          // fill={isCompleted ? colors.secondary.DEFAULT : colors.background.dark.light}
          fill={complete ? colors.secondary.DEFAULT : colors.gray.DEFAULT}
        />
      )}
    </BottomBorder>
  );
});

const UnitRoot = ({ data = {}, children, handleSelect }: UnitRootProp) => {
  const complete = data.lessons!.every((lesson) => lesson.state === 'complete');
  const inProgress = data.lessons!.some((lesson) => lesson.state === 'inprogress');

  const moderateSize = useMemo(
    () =>
      vars({
        '--w-unit-marker': `${moderateScale(23)}px`,
        '--s-unit-marker-size': `${moderateScale(23)}px`,
        '--s-unit': `${moderateScale(115)}px`,
        '--s-unit-image': `${moderateScale(70)}px`,
      }),
    []
  );

  return (
    <View className={`flex-row gap-3`} style={moderateSize}>
      <Pressable
        onPress={() => (complete || inProgress) && handleSelect(data)}
        className={`flex-1 flex-col gap-4`}
      >
        <View className={`flex-row items-center justify-center gap-3`}>{children}</View>
      </Pressable>
    </View>
  );
};

export const UnitBase = {
  Root: UnitRoot,
  Info: UnitInfo,
  Image: UnitImage,
  Marker: UnitMarker,
};
