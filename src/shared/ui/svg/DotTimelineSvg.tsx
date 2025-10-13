import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

function DotTimelineSvg({ color, ...props }: any) {
  return (
    <Svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.0556641} width={16.8889} height={16} rx={5} fill={color} />
    </Svg>
  );
}

export default DotTimelineSvg;
