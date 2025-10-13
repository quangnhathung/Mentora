import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import colors from '@/shared/ui/colors';

function RightPathSvg({ className, active, ...props }: any) {
  return (
    <Svg
      className={className}
      viewBox="0 0 184 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 4.294S151.575-3.09 168.584 8.638C185.592 20.367 181.59 89 181.59 89"
        stroke={active ? colors.secondary.DEFAULT : colors.white.dark}
        strokeWidth={3}
        strokeLinecap="square"
        strokeDasharray="20 5"
      />
    </Svg>
  );
}

export default RightPathSvg;
