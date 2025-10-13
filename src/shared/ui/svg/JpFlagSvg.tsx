import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const JpFlagSvg = (props: any) => {
  return (
    <Svg
      width={30}
      height={20}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_826_4636)">
        <Path d="M0 0h30v20H0V0z" fill="#fff" />
        <Path d="M15 15.625a5.625 5.625 0 100-11.25 5.625 5.625 0 000 11.25z" fill="#D80027" />
      </G>
      <Path
        stroke="#000"
        strokeWidth={0.2}
        d="M0.1 0.1H29.900000000000002V19.900000000000002H0.1z"
      />
      <Defs>
        <ClipPath id="clip0_826_4636">
          <Path fill="#fff" d="M0 0H30V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default JpFlagSvg;
