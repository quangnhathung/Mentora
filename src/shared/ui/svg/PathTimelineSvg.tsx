import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PathTimelineSvg(props: any) {
  return (
    <Svg
      width={4}
      height={60}
      viewBox="0 0 4 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M2 0v60" stroke="#BABABA" strokeWidth={3} strokeDasharray="20 5" />
    </Svg>
  );
}

export default PathTimelineSvg;
