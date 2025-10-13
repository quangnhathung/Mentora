import EmptySvg from '@assets/images/svgs/empty-data.svg';
import ExerciseSvg from '@assets/images/svgs/exercise.svg';
import { useState } from 'react';

import { translate } from '@/shared/lib';
import { colors, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import BarChart from '@/shared/ui/Chart/BarChart';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

const data = [
  { label: 'Speaking', value: 60 },
  { label: 'Listening', value: 97 },
  { label: 'Reading', value: 75 },
  { label: 'Writing', value: 30 },
];

export const ExChart = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const bestItem = data.reduce((max, item) => (item.value > max.value ? item : max));
  return (
    <BottomBorder className={`border-custom-5-light w-full rounded-2xl`}>
      <GradientView
        colors={['primary-dark', 'primary']}
        containerClassName={`w-full overflow-hidden rounded-2xl`}
        className={`bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
      >
        <View className={`p-4`}>
          <View className="w-full flex-row justify-between">
            <ExerciseSvg />
            <Text className="ml-[-5%] font-baloo text-lg text-white">Bài tập đã làm</Text>
            <View />
          </View>
          {data.length > 0 ? (
            <View>
              <Text className="font-baloo text-3xl dark:text-secondary">+200</Text>
              <View className="flex-row justify-around">
                {data.map((item) => (
                  <BarChart
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    best={bestItem.value}
                    isSelected={selected === item.label}
                    onPress={() => setSelected(item.label)}
                  />
                ))}
              </View>
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
};
