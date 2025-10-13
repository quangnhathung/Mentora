import { memo } from 'react';
import { ScrollView, View } from 'react-native';

import { usePostStore } from '@/entities/post/useFeedStore';
import { translate, type TxKeyPath } from '@/shared/lib';
import { Chip } from '@/shared/ui/Chip/Chip';
import { type IconName } from '@/shared/ui/SvgIcon';

type CommunityFiltersProps = {
  header?: React.ReactNode;
};

export const CommunityFilters = memo(({}: CommunityFiltersProps) => {
  const { filter, setFilter } = usePostStore();
  const tabs = ['feed', 'saved', 'news', 'reward'];

  return (
    <ScrollView
      className={`flex-1`}
      horizontal
      // onScroll={onScroll}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
    >
      <View className="w-full flex-row gap-2 py-2 pb-4">
        {tabs.map((val, index) => (
          <View
            key={`community-chip-${val}`}
            className={`${index === 0 && 'pl-4'} ${index === tabs.length - 1 && 'pr-4'}`}
          >
            <Chip
              value={val}
              title={translate(`community.tab.${val}` as TxKeyPath)}
              icon={val as IconName}
              active={filter === val}
              onPress={setFilter}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
});
