import { useMemo, useState } from 'react';

import { type Topic } from '@/entities/topic/type';
import { TopicBlock } from '@/shared/TopicBlock';
import { ScrollView, View } from '@/shared/ui';

import { LevelFilter } from './LevelFilter';
import { type Filter } from './LevelFilter';

type Props = {
  topics: Topic[];
  className?: string;
};

export const SearchLabel: Filter[] = [
  { key: 'all', label: 'All' },
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
];

export const TopicSearch = ({ topics, className }: Props) => {
  const [value, setValue] = useState<string>('all');

  // --- Tạo danh sách topic đã được lọc ---
  const filteredTopics = useMemo(() => {
    if (value === 'all') return topics;
    return topics.filter((t) => t.difficulty?.toLowerCase() === value.toLowerCase());
  }, [value, topics]);

  return (
    <View className="w-full">
      <LevelFilter data={SearchLabel} value={value} onChange={setValue} />

      <ScrollView className={`flex-1 ${className} py-4`}>
        <View className="w-full items-center gap-2 px-3">
          {filteredTopics.map((topic) => (
            <TopicBlock isScale key={topic.id} topic={topic} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
