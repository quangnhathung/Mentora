import TargetSvg from '@assets/images/svgs/target.svg';
import React, { memo, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { type Mission } from '@/entities/mission/types';
import { MissionItem } from '@/entities/mission/ui/MissionItem';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import Countdown from '@/features/mission/ui/Countdown';
import { EMPTY_ARR } from '@/shared/constants/value';
import { translate } from '@/shared/lib';
import { colors, NoData, Text, View } from '@/shared/ui';

export const MissionTasks = memo(() => {
  // chỉ subscribe đúng slice cần dùng; chỉ re-render khi tham chiếu slice đổi
  const { missions } = useMissionStore(
    useShallow((state) => ({ missions: state.missions?.data?.missions }))
  );
  const items = useMemo(() => missions ?? EMPTY_ARR<Mission>(), [missions]);

  const title = useMemo(() => translate('mission.dailyMissions'), []);

  return (
    <View className="mt-3">
      <View className="flex-row justify-between">
        <View className="flex-row items-center justify-center gap-1">
          <TargetSvg color={colors.cyan.DEFAULT} />
          <Text>{title}</Text>
        </View>
        <Countdown />
      </View>

      <View className="flex-col gap-3 py-2">
        {items.length === 0 ? (
          <View>
            <NoData />
            <Text tx="noti.error.empty" className="pt-4 text-center" />
          </View>
        ) : (
          items.map((mission: any) => <MissionItem key={String(mission.id)} data={mission} />)
        )}
      </View>
    </View>
  );
});
