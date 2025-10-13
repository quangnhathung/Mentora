import EventSvg from '@assets/images/svgs/event.svg';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { type ChallengeBundle } from '@/entities/mission/types';
import { ChallengeItem } from '@/entities/mission/ui/ChallengeItem';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import Countdown from '@/features/mission/ui/Countdown';
import { EMPTY_OBJ } from '@/shared/constants/value';
import { translate } from '@/shared/lib';
import { colors, Text, View } from '@/shared/ui';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

export const MonthlyChallenges = () => {
  const { challenges } = useMissionStore(
    useShallow((state) => ({ challenges: state.challenges?.data }))
  );
  const items = useMemo(() => challenges ?? EMPTY_OBJ<ChallengeBundle>(), [challenges]);

  return (
    <View className={``}>
      <View className={`mt-2 w-full flex-row items-center justify-center`}>
        <TextGradient
          className={`from-primary via-white to-primary py-2 text-center font-baloo text-xl uppercase tracking-widest`}
          content={translate('challenge.title')}
          colors={['primary', 'white', 'primary']}
          locations={[0, 0.47, 1]}
        />
      </View>
      <View className="">
        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-center gap-1">
            <EventSvg color={colors.cyan.DEFAULT} />
            <Text className="">{items?.title ?? translate('challenge.heading')}</Text>
          </View>
          <Countdown mode="month" />
        </View>
        <View className={`flex-col gap-3 py-2`}>
          {items?.challenges?.map((challenge) => (
            <ChallengeItem key={`challenge-${challenge?.id}`} data={challenge} />
          ))}
        </View>
      </View>
    </View>
  );
};
