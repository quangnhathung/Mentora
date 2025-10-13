import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';
import { HeaderWithBack } from '@/widgets/common/HeaderWithBack';

export default function Unit() {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <TwoSectionHeader
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Header={<HeaderWithBack title="Unit" />}
      Body={
        <View className={`items-center justify-center py-2`}>
          <TextGradient
            className={`from-primary via-white to-primary py-2 text-center font-baloo text-xl uppercase tracking-widest`}
            content={`Unit`}
            colors={['primary', 'white', 'primary']}
          />
        </View>
      }
    />
  );
}
