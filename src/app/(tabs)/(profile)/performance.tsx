import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import { useMemo } from 'react';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, View } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { ExChart } from '@/widgets/profile/ExeChart';
import HeatmapLayout from '@/widgets/profile/HeatMap';
import VocabularyChart from '@/widgets/profile/VocabularyChart';

const heatmapData1 = [
  [0, 1, 0, 3, 0],
  [0, 1, 2, 3, 1],
  [1, 1, 1, 2, 1],
  [0, 0, 2, 1, 1],
  [0, 1, 1, 2, 2],
  [2, 3, 0, 1, 0],
  [1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1],
  [0, 1, 2, 3, 1],
  [1, 1, 1, 2, 1],
  [0, 1, 0, 3, 0],
  [0, 1, 1, 2, 2],
  [2, 3, 0, 1, 0],
  [0, 0, 2, 1, 1],
];

const heatmapData2 = [
  [1, 2, 3, 2, 1],
  [2, 1, 0, 1, 2],
  [3, 2, 1, 0, 1],
  [2, 1, 2, 3, 2],
  [1, 0, 1, 2, 3],
  [0, 1, 2, 1, 0],
  [1, 2, 1, 0, 1],
  [2, 3, 2, 1, 0],
  [1, 0, 1, 2, 3],
  [0, 1, 0, 1, 2],
  [1, 2, 3, 0, 1],
  [2, 1, 2, 3, 0],
  [1, 0, 1, 2, 3],
  [0, 1, 2, 3, 1],
];

export default function ProfileUserPerformance() {
  const router = useRouter();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('profile.menu.setting')}
          left={
            <BackButton
              size={`--h-20`}
              iconSize={20}
              color={colors.white.DEFAULT}
              className={`absolute left-0 w-12`}
              onPress={() => router.back()}
            />
          }
          // right={}
        />
      }
      Body={
        <View className="flex-1 flex-col items-center justify-start gap-4">
          <View>
            <HeatmapLayout
              monthRange1="T1-T2"
              monthRange2="T3-T4"
              year={2025}
              data1={heatmapData1}
              data2={heatmapData2}
            />
          </View>
          <VocabularyChart />

          <ExChart />
        </View>
      }
      Bottom={<></>}
    />
  );
}
