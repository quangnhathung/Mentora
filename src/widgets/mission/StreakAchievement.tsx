//daily mission update!

import React, { memo, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { type CheckInDay } from '@/entities/mission/types';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import { EMPTY_ARR } from '@/shared/constants/value';
import { Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SvgIcon } from '@/shared/ui/SvgIcon';
export const StreakAchievemente = memo(() => {
  const { checkIn } = useMissionStore(
    useShallow((state) => ({ checkIn: state.missions?.data?.checkIn }))
  );
  const items = useMemo(() => checkIn ?? EMPTY_ARR<CheckInDay>(), [checkIn]);

  const title = '3 day streak!';
  const content = 'Consistency beats intensity. Keep showing up!';

  return (
    <View>
      <View className="items-center justify-between pb-5">
        <SvgIcon size={100} name="fire" />
      </View>
      <BottomBorder className="border-custom-5 w-full rounded-xl">
        <GradientView
          colors={['primary-dark', 'primary', 'primary-light']}
          containerClassName={`rounded-xl`}
          className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          pointerEvents="box-none"
        >
          <View className="w-full items-center justify-center px-4 py-3">
            <Text className="mb-3 font-baloo text-3xl dark:text-cyan">{title}</Text>
            <View className="flex-row gap-4 pb-5">
              {items.map((check) => (
                <View key={check.key} className="items-center justify-center">
                  {check.done ? (
                    <SvgIcon name="checked" size={28} />
                  ) : (
                    <SvgIcon name="checkfailgray" size={28} />
                  )}
                  <Text>{check.key}</Text>
                </View>
              ))}
            </View>
            <Text className="text-center font-bevietnampro text-lg dark:text-white">{content}</Text>
            <View className="mt-5 items-center justify-between">
              <SvgIcon size={80} name="handclap" />
            </View>
          </View>
        </GradientView>
      </BottomBorder>
    </View>
  );
});
