import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import type { RankUser } from '@/entities/leaderboard/types';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image, Text, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import Medal1 from '@/shared/ui/svg/Medal1';
import Medal2 from '@/shared/ui/svg/Medal2';
import Medal3 from '@/shared/ui/svg/Medal3';

export const TopPodium = memo(({ data }: { data: RankUser[] }) => {
  if (!data?.length) return null;

  const [first, second, third] = data;

  const Pill = ({
    u,
    medal,
    size = 60,
    className,
  }: {
    u?: RankUser;
    medal?: React.ReactNode;
    size?: number;
    className?: string;
  }) => (
    <View className="items-center">
      <View
        className={`items-center justify-center`}
        style={{ width: moderateScale(size), height: moderateScale(size) }}
      >
        <Image
          source={{ uri: u?.user.avatar }}
          className={`size-full rounded-full border-2 border-white`}
        />
      </View>
      <Text numberOfLines={1} className="my-2 w-[80px] font-baloo text-white">
        {u?.user.name ?? ''}
      </Text>
      <View className={`items-center justify-center`}>
        <GradientView
          colors={['primary-dark', 'primary', 'primary-light']}
          containerClassName={`rounded-xl`}
          start={{ x: 0.5, y: 0 }} // top
          end={{ x: 0.5, y: 1 }} // bottom
          className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
        >
          <View
            className={twMerge(
              `mt-2 min-w-[65px] flex-row items-center justify-center px-4 pt-8`,
              className
            )}
          >
            <View className={`flex-col items-center justify-center`}>
              <Text className="mt-3 text-center font-baloo text-white">{u?.score ?? 0}</Text>
              <Text className="text-center font-baloo text-white">{translate('common.exp')}</Text>
            </View>
          </View>
        </GradientView>
        <View className={`z-999 absolute -top-1 items-center justify-center`}>{medal}</View>
      </View>
    </View>
  );

  return (
    <View className="px-5 py-4">
      <View className="flex-row items-end justify-center gap-2">
        <Pill u={second} medal={<Medal2 />} size={70} />
        <Pill u={first} medal={<Medal1 />} size={80} className={`pt-16`} />
        <Pill u={third} medal={<Medal3 />} className={`pt-6`} />
      </View>
    </View>
  );
});
