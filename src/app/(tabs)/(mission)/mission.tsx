import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';
import { Badge } from '@/shared/ui/badge/Badge';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { CheckInDaily } from '@/widgets/mission/CheckIn';
import { MissionTasks } from '@/widgets/mission/MissionTasks';
import { MonthlyChallenges } from '@/widgets/mission/MonthlyChallenges';

export default function Mission() {
  const router = useRouter();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-7': `${moderateScale(7)}px`,
        '--s-20': `${moderateScale(20)}px`,
        '--s-150': `${moderateScale(150)}px`,
      }),
    []
  );

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('mission.title')}
          left={<Badge icon={'badge'} onPress={() => router.push('/(tabs)/(mission)/badge')} />}
          right={
            <Badge
              icon={'leaderboardStage'}
              onPress={() => router.push('/(tabs)/(mission)/leaderboard')}
            />
          }
        />
      }
      Body={
        <View className={`p-4`}>
          <CheckInDaily />
          <MissionTasks />
          <MonthlyChallenges />
        </View>
      }
    />
  );
}
