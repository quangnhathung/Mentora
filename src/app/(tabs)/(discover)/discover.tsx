import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import HeaderWithSearch from '@/widgets/common/HeaderWithSearch';

const DiscoverScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const handlePress = () => {
    router.push('/(discover)/search');
  };

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={false}
      style={moderateSize}
      Header={<HeaderWithSearch title={translate('nav.discover.label')} onPress={handlePress} />}
      Body={<View className="flex-1"></View>}
    />
  );
};

export default withErrorBoundary(DiscoverScreen);
