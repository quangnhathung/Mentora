import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const VnFlagSvg = (props: any) => {
  return (
    <Svg
      width={30}
      height={20}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_826_4631)">
        <Path d="M11.522 0H0v20h30V0H11.522z" fill="#D80027" />
        <Path
          d="M15 4.216l1.328 4.086h4.297l-3.477 2.526 1.329 4.087L15 12.389l-3.476 2.526 1.328-4.087-3.477-2.526h4.297L15 4.216z"
          fill="#FFDA44"
        />
      </G>
      <Path
        stroke="#000"
        strokeWidth={0.2}
        d="M0.1 0.1H29.900000000000002V19.900000000000002H0.1z"
      />
      <Defs>
        <ClipPath id="clip0_826_4631">
          <Path fill="#fff" d="M0 0H30V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default VnFlagSvg;
