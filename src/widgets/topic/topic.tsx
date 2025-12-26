import { router } from 'expo-router';
import React from 'react';

import { type Topic } from '@/entities/topic/type';
import { Pressable, Text, View } from '@/shared/ui';
import { SvgIcon } from '@/shared/ui/SvgIcon';

import { TopicLessonList } from './component/LessonList';

type props = {
  data: Topic;
  className?: string;
};

export function TopicScreen({ data, className }: props) {
  return (
    <View className={`${className} px-3`}>
      <View className="w-full flex-row justify-between">
        <Pressable
          onPress={() => {
            router.replace('/(tabs)/(discover)/discover');
          }}
          className="left-3 top-0"
        >
          <SvgIcon name="arrowleft" size={21} color="black" />
        </Pressable>

        <Text className="-ml-5 mb-0 pb-0 text-center font-baloo text-2xl">Topic:</Text>
        <View />
      </View>

      <Text className="m-0 p-0 text-center font-baloo text-3xl">{data.title}</Text>
      <Text className="my-2 text-center text-xl">
        Learn essential English for {data.title.toLowerCase()} with ease.
      </Text>
      <TopicLessonList className="" data={data} />
    </View>
  );
}
