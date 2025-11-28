import React from 'react';

import { type Topic } from '@/entities/topic/type';
import { Text, View } from '@/shared/ui';

import { TopicLessonList } from './component/LessonList';

type props = {
  data: Topic;
  className?: string;
};

export function TopicScreen({ data, className }: props) {
  return (
    <View className={`${className} px-3`}>
      <Text className="mb-0 pb-0 text-center font-baloo text-2xl">Topic:</Text>
      <Text className="m-0 p-0 text-center font-baloo text-3xl">{data.title}</Text>
      <Text className="my-2 text-center text-xl">
        Learn essential English for {data.title.toLowerCase()} with ease.
      </Text>
      <TopicLessonList className="" data={data} />
    </View>
  );
}
