import EventSvg from '@assets/images/svgs/event.svg';

import { type Mission } from '@/entities/mission/types';
import { ChallengeItem } from '@/entities/mission/ui/ChallengeItem';
import Countdown from '@/features/mission/ui/Countdown';
import { translate } from '@/shared/lib';
import { colors, Text, View } from '@/shared/ui';

type ChallengeTasksProp = {
  title: string;
  challenges: Mission[];
};

export const ChallengeTasks = ({ title, challenges }: ChallengeTasksProp) => {
  return (
    <View className="">
      <View className="flex-row justify-between">
        <View className="flex-row items-center justify-center gap-1">
          <EventSvg color={colors.cyan.DEFAULT} />
          <Text className="">{title ?? translate('challenge.heading')}</Text>
        </View>
        <Countdown mode="month" />
      </View>
      <View className={`flex-col gap-3 py-2`}>
        {challenges.map((challenge) => (
          <ChallengeItem key={`challenge-${challenge?.id}`} data={challenge} />
        ))}
      </View>
    </View>
  );
};
