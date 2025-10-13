import { memo } from 'react';

import { type TopicLevelFilter } from '@/entities/topic/types';
import { useTopicFeedStore } from '@/entities/topic/useTopicFeedStore';
import { translate, type TxKeyPath } from '@/shared/lib';
import { ScrollView, View } from '@/shared/ui';
import { Chip } from '@/shared/ui/Chip/Chip';
import { type IconName } from '@/shared/ui/SvgIcon';

const FILTERS: TopicLevelFilter[] = ['all', 'beginner', 'elementary', 'intermediate', 'advanced'];

export const TopicFilters = memo(() => {
  const { level, setLevel } = useTopicFeedStore();

  return (
    <ScrollView
      className={`flex-1`}
      horizontal
      // onScroll={onScroll}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
    >
      <View className="w-full flex-row items-center justify-center gap-2 py-2 pb-4">
        {FILTERS.map((val, index) => (
          <View
            key={`community-chip-${val}`}
            className={`items-center justify-center ${index === 0 && 'pl-4'} ${index === FILTERS.length - 1 && 'pr-4'}`}
          >
            <Chip
              value={val}
              title={translate(`levels.${val}` as TxKeyPath)}
              icon={val as IconName}
              active={level === val}
              onPress={setLevel}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
});
