//daily mission update!

import React, { memo } from 'react';

import { Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SvgIcon } from '@/shared/ui/SvgIcon';

export const AchievementUnlocked = memo(() => {
  const title = 'New Achievement Unlock!';
  const content = 'Another step forward, another door unlocked';

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full pb-8">
        <View className="-mb-5 items-center justify-center">
          <SvgIcon size={320} name="UnlockAchieve" />
        </View>
        <BottomBorder className="border-custom-5 -mt-9 rounded-xl">
          <GradientView
            colors={['primary-dark', 'primary', 'primary-light']}
            containerClassName={`w-full rounded-xl`}
            className={`bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            pointerEvents="box-none"
          >
            <View className="w-full items-center justify-center px-4 py-7 pb-0">
              <Text className="mb-3 font-baloo text-2xl dark:text-cyan">{title}</Text>
              <Text className="text-center font-bevietnampro text-lg dark:text-white">
                {content}
              </Text>
              <View className="mt-5 items-center">
                <Text className="font-baloo text-lg">You earn</Text>
                <View className="flex-row gap-2">
                  <Text className="font-baloo text-[60px] dark:text-cyan">{'20'}</Text>
                  <SvgIcon size={40} name="star" />
                </View>
              </View>
            </View>
          </GradientView>
        </BottomBorder>
      </View>
    </View>
  );
});
