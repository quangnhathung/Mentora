import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const DeFlagSvg = (props: any) => {
  return (
    <Svg
      width={30}
      height={20}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_826_4641)">
        <Path d="M0 0h30v20H0V0z" fill="#D80027" />
        <Path d="M0 0h30v6.666H0V0z" fill="#000" />
        <Path d="M0 13.333h30V20H0v-6.667z" fill="#FFDA44" />
      </G>
      <Path
        stroke="#000"
        strokeWidth={0.2}
        d="M0.1 0.1H29.900000000000002V19.900000000000002H0.1z"
      />
      <Defs>
        <ClipPath id="clip0_826_4641">
          <Path fill="#fff" d="M0 0H30V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DeFlagSvg;
