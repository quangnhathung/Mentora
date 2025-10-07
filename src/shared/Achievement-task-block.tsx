import { vars } from 'nativewind';
import React from 'react';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { ProgressBar, Text, View } from '@/shared/ui';

type props = {
  currentProcess: number;
  target: number;
  topic: string;
};

export const AchieveTask = ({ target, currentProcess, topic }: props) => {
  const process = Number((currentProcess / target).toFixed(2));
  const moderateSize = vars({
    '--s-7': `${moderateScale(62)}px`,
    '--s-8': `${moderateScale(10)}px`,
  });
  const value = topic[0];

  return (
    <View className={`my-1 w-full flex-row`}>
      <View className="w-[22%] justify-center">
        <View
          className="size-[--s-7] items-center justify-center rounded-full border-[3px] border-white"
          style={moderateSize}
        >
          <Text
            style={{
              lineHeight: moderateScale(60),
              fontSize: moderateScale(50),
            }}
            className="font-bold"
          >
            {value}
          </Text>
        </View>
      </View>

      <View className="flex-1 rounded-xl border-2 border-white p-2">
        <Text className="text-sm text-white">
          Complete the topic{' '}
          <Text className="text-base font-bold underline decoration-dotted dark:text-primary">
            {topic}
          </Text>{' '}
          to receive the letter{' '}
          <Text className="text-base font-bold dark:text-secondary">
            {value}
          </Text>{' '}
          immediately.
        </Text>

        <View className="mt-1 flex-row justify-between">
          <Text className="text-xs text-white">
            {currentProcess} / {target}
          </Text>
          <Text className="text-xs text-white">{process * 100}%</Text>
        </View>

        <ProgressBar initialProgress={process * 100} className="mt-1 w-full" />
      </View>
    </View>
  );
};
