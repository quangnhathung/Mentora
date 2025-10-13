import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Keyboard } from 'react-native';

import { type Topic } from '@/entities/topic/types';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import HeaderWithSearch from '@/widgets/common/HeaderWithSearch';
import { TopicRecentSearch } from '@/widgets/topic/TopicRecentSearch';
import { TopicSearch } from '@/widgets/topic/TopicSearch';

export default function Search() {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const [query, setQuery] = useState<string>('');

  const handleSelect = (topic: Topic) => {
    Keyboard.dismiss();
    console.log('selected topic', topic);
  };

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
          onQueryChange={setQuery}
        />
      }
      Body={
        <View className={`items-center justify-center pt-2`}>
          {query === '' ? (
            <TopicRecentSearch onSelect={handleSelect} />
          ) : (
            <TopicSearch q={query} onSelect={handleSelect} />
          )}
        </View>
      }
    />
  );
}
