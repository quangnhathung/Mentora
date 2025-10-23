import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import HeaderWithSearch from '@/widgets/common/HeaderWithSearch';

export default function Search() {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  //const [query, setQuery] = useState<string>('');

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
          //onQueryChange={setQuery}
        />
      }
      Body={
        <View className={`items-center justify-center pt-2`}>
          {/* {query === '' ? (
            <TopicRecentSearch onSelect={handleSelect} />
          ) : (
            <TopicSearch q={query} onSelect={handleSelect} />
          )} */}
        </View>
      }
    />
  );
}
