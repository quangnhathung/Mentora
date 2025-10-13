import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import colors from '@/shared/ui/colors';

function LeftPathSvg({ className, active, ...props }: any) {
  return (
    <Svg
      className={className}
      viewBox="0 0 183 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M182 4.29384C182 4.29384 32.4249 -3.09019 15.4163 8.63825C-1.59221 20.3667 2.40981 89 2.40981 89"
        stroke={active ? colors.secondary.DEFAULT : colors.white.dark}
        strokeWidth={3}
        strokeDasharray="20 5"
      />
    </Svg>
  );
}

export default LeftPathSvg;
