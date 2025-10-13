import EmptySvg from '@assets/images/svgs/empty-data.svg';
import VocabSvg from '@assets/images/svgs/vocab.svg';
import { cssInterop } from 'nativewind';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart as LineChartRN } from 'react-native-chart-kit';

import { translate } from '@/shared/lib';
import { colors, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['T2/2024', '', 'T7/2024', '', '', 'T9/2025'],
  datasets: [
    {
      data: [500, 300, 420, 250, 400, 450, 300, 420, 500, 250, 400, 450],
      color: () => '#ffffff',
      strokeWidth: 6,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: 'transparent',
  backgroundGradientTo: 'transparent',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,

  fillShadowGradientFrom: 'transparent',
  fillShadowGradientTo: 'transparent',
  fillShadowGradientOpacity: 0,

  decimalPlaces: 0,
  strokeWidth: 1,
  color: () => colors.white.DEFAULT,
  labelColor: () => colors.white.DEFAULT,
  propsForDots: { r: '0' },
  propsForBackgroundLines: { stroke: 'transparent' },
};

const LineChart = cssInterop(LineChartRN, { className: 'style' });

export default function VocabularyChart() {
  return (
    <BottomBorder className={`border-custom-5-light w-full rounded-2xl`}>
      <GradientView
        colors={['primary-dark', 'primary']}
        containerClassName={`w-full overflow-hidden rounded-2xl`}
        className={`bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
      >
        <View className={`p-4`}>
          <View className="w-full flex-row justify-between">
            <VocabSvg />
            <Text className="ml-[-5%] font-baloo text-lg text-white">Từ vựng đã nạp</Text>
            <View />
          </View>
          {Object.keys(data).length > 0 ? (
            <View>
              <Text className="font-baloo text-3xl dark:text-secondary">+1500</Text>

              <LineChart
                data={data}
                className={``}
                width={screenWidth - 24}
                height={160}
                withShadow={false}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                bezier
                style={{
                  // backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : (
            <View className={`size-[150px] w-full items-center justify-center p-4`}>
              <EmptySvg
                width={'100%'}
                height={`100%`}
                className={`size-full`}
                color={colors.white.dark}
              />
              <Text className="ml-[-5%] font-bevietnampro text-sm dark:text-white-dark">
                {translate('noti.error.empty')}
              </Text>
            </View>
          )}
        </View>
      </GradientView>
    </BottomBorder>
  );
}
