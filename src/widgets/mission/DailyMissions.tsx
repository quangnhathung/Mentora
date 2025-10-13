//daily mission update!

import React, { memo, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { type Mission } from '@/entities/mission/types';
import { MissionItem } from '@/entities/mission/ui/MissionItem';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import { EMPTY_ARR } from '@/shared/constants/value';
import { translate } from '@/shared/lib';
import { NoData, Text, View } from '@/shared/ui';

export const MissionUpdate = memo(() => {
  const { missions } = useMissionStore(
    useShallow((state) => ({ missions: state.missions?.data?.missions }))
  );
  const items = useMemo(() => missions ?? EMPTY_ARR<Mission>(), [missions]);

  const title = useMemo(() => translate('mission.updated'), []);

  return (
    <View>
      <View className="items-center justify-between">
        <Text className="font-baloo text-2xl text-white">{title}</Text>
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
