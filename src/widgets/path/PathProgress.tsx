import { View } from 'react-native';

import { useUserStore } from '@/entities/user/useUserStore';
import { ProgressBar, Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

export const PathProgress = () => {
  const { profile } = useUserStore();

  return (
    <BottomBorder className={`border-custom-5 rounded-b-2xl`}>
      <GradientView
        colors={['background-dark-light', 'background-dark-light', 'background-dark-light']}
        containerClassName={`overflow-hidden rounded-xl`}
        className={`via-dark-light bg-gradient-to-r from-background-dark-light to-background-dark-light`}
      >
        <View className={`rounded-lg p-3`}>
          <Text className="text-white">{profile?.progress?.currentPath?.name}</Text>
          <View className={`flex-row justify-between`}>
            <Text className="my-1 text-xs dark:text-white">
              {profile?.progress?.currentPath?.currentTopic?.name}
            </Text>
            <Text className="my-1 text-xs dark:text-cyan">
              {profile?.progress?.currentPathProgress}%
            </Text>
          </View>
          <ProgressBar initialProgress={profile?.progress?.currentPathProgress} />
        </View>
        {/* <ProgressBar pct={data.progressPct} className="mt-2" /> */}
      </GradientView>
    </BottomBorder>
  );
};
