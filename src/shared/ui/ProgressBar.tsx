import { vars } from 'nativewind';
import React from 'react';

import { View } from '@/shared/ui';

type ProgressBarProps = {
  percentage: number;
  height?: number;
  backgroundColor?: string;
  foregroundColor?: string;
};

const ProgressBar = ({
  percentage,
  height = 8,
  backgroundColor = 'white',
  foregroundColor = 'primary',
}: ProgressBarProps) => {
  const cssVars = vars({
    '--h': `${height}`,
    '--bg': backgroundColor,
    '--fg': foregroundColor,
  });

  return (
    <View style={cssVars} className={`h-[--h] w-full rounded-3xl bg-[--bg]`}>
      <View
        style={{
          ...cssVars,
          width: `${percentage}%`,
        }}
        className={`h-full rounded-3xl bg-[--fg]`}
      />
    </View>
  );
};

export default ProgressBar;
