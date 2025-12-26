import { router } from 'expo-router';

import { type Topic } from '@/entities/topic/type';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { LessonItem } from '@/shared/Lesson';
import { ScrollView, View } from '@/shared/ui';
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { PremiumBanner } from '@/widgets/profile/ProfilePremiumBanner';
type Props = {
  data: Topic;
  className?: string;
};

export function TopicLessonList({ data, className }: Props) {
  useHideTabBar();

  return (
    <ScrollView className={`${className}`}>
      <View className="pb-1">
        {data.lessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            onPress={() => {
              router.push({
                pathname: '/(tabs)/(discover)/exam/[eid]',
                params: { eid: lesson.id, tid: data.id },
              });
            }}
          />
        ))}
      </View>
      <AdBanner />
      <PremiumBanner />
    </ScrollView>
  );
}
