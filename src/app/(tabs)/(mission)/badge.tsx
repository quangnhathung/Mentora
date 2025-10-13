import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { AchievementsList } from '@/widgets/mission/AchievementsList';

export default function BadgeScreen() {
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
      scrollable={false}
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('badge.title')}
          left={
            <BackButton
              size={`--h-20`}
              iconSize={20}
              color={colors.white.DEFAULT}
              className={`absolute left-0 w-12`}
              onPress={() => router.back()}
            />
          }
        />
      }
      Body={
        <View className={``}>
          <AchievementsList />
        </View>
      }
    />
  );
}
