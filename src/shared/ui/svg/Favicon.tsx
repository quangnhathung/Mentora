import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type Props = {
  className?: string;
};

const Favicon = (props: Props) => (
  <Svg viewBox="0 0 125 120" fill="none" {...props}>
    <Path
      d="M0.5 10.6352C0.500009 2.9372 8.83334 -1.87396 15.5 1.97504L101 51.3383C107.667 55.1873 107.667 64.8096 101 68.6586L84.2891 78.3061C81.7558 68.357 72.7377 60.9985 62 60.9985C49.2975 60.9985 39.0001 71.296 39 83.9985C39 90.4473 41.6552 96.2753 45.9307 100.452L15.5 118.022C8.83333 121.871 0.5 117.06 0.5 109.362V10.6352Z"
      fill="url(#paint0_linear_1809_8060)"
    />
    <Path
      d="M109.5 1.97503C116.167 -1.87396 124.5 2.9372 124.5 10.6352V109.362C124.5 117.06 116.167 121.871 109.5 118.022L78.4345 100.086C82.4952 95.9387 85 90.2615 85 83.9985C84.9999 71.296 74.7024 60.9985 62 60.9985C51.4429 60.9985 42.5476 68.1114 39.8437 77.8061L24 68.6586C17.3334 64.8096 17.3333 55.1873 24 51.3383L109.5 1.97503Z"
      fill="url(#paint1_linear_1809_8060)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1809_8060"
        x1={0.5}
        y1={59.9985}
        x2={106}
        y2={59.9985}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DB9200" />
        <Stop offset={0.5551} stopColor="#FFAA00" />
        <Stop offset={1} stopColor="#FFC042" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1809_8060"
        x1={19}
        y1={59.9985}
        x2={124.5}
        y2={59.9985}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#594DB7" />
        <Stop offset={0.475} stopColor="#7F6FFE" />
        <Stop offset={1} stopColor="#9C8FFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Favicon;
