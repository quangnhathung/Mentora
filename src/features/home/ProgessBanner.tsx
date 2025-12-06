import { View } from 'react-native';

import { useProgressStore } from '@/entities/user/hook/useProgressStore';
import { useUserStore } from '@/entities/user/useUserStore';
import { ProgressBar, Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

const emptyProgress = {
  app: 0,
  checkin: 0,
  game: 0,
  lesson: 0,
};
export const ProgressBanner = () => {
  const profile = useUserStore((state) => state.user);
  const progress = useProgressStore((s) => s.progress[profile?.id!]) ?? emptyProgress;
  const targetProggress = 4;
  var currentProgress = 0;

  if (progress.app === 30) currentProgress += 1;
  if (progress.checkin === 1) currentProgress += 1;
  if (progress.game === 1) currentProgress += 1;
  if (progress.lesson === 3) currentProgress += 1;

  return (
    <BottomBorder className={`border-custom-5 rounded-b-2xl`}>
      <GradientView
        colors={['#A78BFA', '#F472B6']}
        containerClassName={`overflow-hidden rounded-xl`}
        className={`via-dark-light bg-gradient-to-r from-background-dark-light to-background-dark-light`}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View className={`rounded-lg p-3`}>
          <Text className="font-baloo text-xl dark:text-white">
            Hi {profile?.name ?? 'Guest'}, ready to practice today?
          </Text>
          <Text className="dark:text-white">Today learning journey</Text>
          <View className={`flex-row justify-between`}>
            <Text className="my-1 text-xs dark:text-white">{profile?.name ?? 'Guest'}</Text>
            <Text className="my-1 text-xs dark:text-cyan">
              {(currentProgress / targetProggress) * 100}%
            </Text>
          </View>
          <ProgressBar initialProgress={(currentProgress / targetProggress) * 100} />
        </View>
        {/* <ProgressBar pct={data.progressPct} className="mt-2" /> */}
      </GradientView>
    </BottomBorder>
  );
};
