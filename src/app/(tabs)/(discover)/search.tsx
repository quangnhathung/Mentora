import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';

import { mockTopics } from '@/entities/topic/mock';
import { type Topic } from '@/entities/topic/type';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import HeaderWithSearch from '@/widgets/common/HeaderWithSearch';
import { TopicSearch } from '@/widgets/topic/TopicSearch';

export default function Search() {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  useHideTabBar();

  const [query, setQuery] = useState<string>('');
  const filteredTopics = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    return mockTopics.filter((topic: Topic) => {
      return topic.title?.toLowerCase().includes(lowerQuery);
    });
  }, [query]);

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <HeaderWithSearch
          title={translate('nav.discover.label')}
          autoFocus
          onQueryChange={(text) => setQuery(text)}
          onCancel={() => setQuery('')}
        />
      }
      Body={
        <View className={`items-center justify-center pt-2`}>
          {query === '' ? (
            <View className="w-full pt-5">
              <Text className="text-center text-base dark:text-[#6B7280]">
                Type to search topics!
              </Text>
            </View>
          ) : (
            <TopicSearch topics={filteredTopics} />
          )}
        </View>
      }
    />
  );
}
