import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import colors from '@/shared/ui/colors';

function StageActiveSvg({ width = 113, height = 76, ...props }: any) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 46.153v10.044l32.891 19.114V65.267L0 46.153z"
        fill="url(#paint0_linear_1345_5264)"
      />
      <Path d="M79.562 65.266h-46.67V75.31h46.67V65.266z" fill="url(#paint1_linear_1345_5264)" />
      <Path
        d="M79.562 65.264v10.044l33.106-19.119V46.145L79.562 65.264z"
        fill="url(#paint2_linear_1345_5264)"
      />
      <Path
        d="M33.249.003L.148 19.119 0 46.153l32.891 19.114 46.671-.003 33.106-19.119.152-27.031L79.92 0 33.249.003z"
        fill="url(#paint3_linear_1345_5264)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1345_5264"
          x1={0}
          y1={60.7321}
          x2={32.891}
          y2={60.7321}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={colors.secondary.dark} />
          <Stop offset={0.475} stopColor={colors.secondary.DEFAULT} />
          <Stop offset={1} stopColor={colors.secondary.light} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1345_5264"
          x1={32.8911}
          y1={70.288}
          x2={79.5621}
          y2={70.288}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={colors.secondary.dark} />
          <Stop offset={0.475} stopColor={colors.secondary.DEFAULT} />
          <Stop offset={1} stopColor={colors.secondary.light} />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1345_5264"
          x1={79.562}
          y1={60.7265}
          x2={112.668}
          y2={60.7265}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={colors.secondary.dark} />
          <Stop offset={0.475} stopColor={colors.secondary.DEFAULT} />
          <Stop offset={1} stopColor={colors.secondary.light} />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_1345_5264"
          x1={0}
          y1={32.6335}
          x2={112.82}
          y2={32.6335}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={colors.secondary.dark} />
          <Stop offset={0.475} stopColor={colors.secondary.DEFAULT} />
          <Stop offset={1} stopColor={colors.secondary.light} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default StageActiveSvg;
