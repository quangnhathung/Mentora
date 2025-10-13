import CurrentLevel from '@assets/images/svgs/current-level.svg';
import MaxLevel from '@assets/images/svgs/max-level.svg';

import { type UserProgress } from '@/entities/user/types';
import { translate } from '@/shared/lib';
import { ProgressBar, Text, View } from '@/shared/ui';

type Props = { progress: UserProgress }; // value từ 0 đến 1

export const LevelProgress = ({ progress }: Props) => {
  return (
    <View className="w-full flex-col">
      <Text className="my-1 font-bevietnampro text-white">{translate('common.level')}</Text>

      <View className="w-full flex-row items-center rounded-xl bg-background-dark px-4 py-8">
        <Text className="font-baloo dark:text-primary">Beginner</Text>

        {/* Wrapper progress */}
        <View className="relative mx-3 flex-1">
          {/* Thanh progress */}
          <ProgressBar
            initialProgress={progress?.currentLevelProgress}
            className="w-full"
            marker={
              <View
                className="absolute top-2"
                style={{
                  left: `${progress?.currentLevelProgress}%`,
                  transform: [{ translateX: -8 }, { translateY: -13 }],
                }}
              >
                <CurrentLevel />
                <Text className="absolute -left-2 -top-7 w-[100px] font-bevietnampro text-xs text-white">
                  {progress?.currentLevelExp} {translate('common.exp')}
                </Text>
              </View>
            }
          />

          {/* Marker đầu (0%) */}
          <View
            className="absolute top-2.5"
            style={{
              left: '100%',
              transform: [{ translateX: -8 }, { translateY: -15 }], // giả sử icon 16x16
            }}
          >
            <MaxLevel />
            <Text className="absolute -left-2 -top-7 w-[100px] font-bevietnampro text-xs text-white">
              {progress?.currentLevelMaxExp} {translate('common.exp')}
            </Text>
          </View>

          {/* Marker hiện tại (value*100%) */}
        </View>

        <Text className="font-baloo dark:text-primary">Elementary</Text>
      </View>
    </View>
  );
};
