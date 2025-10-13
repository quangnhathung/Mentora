import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DialogSvg({ height = 58, ...props }: any) {
  const safeHeight = Number.isFinite(height) ? height : 58;

  return (
    <Svg
      width={311}
      height={safeHeight}
      viewBox={`0 0 311 ${safeHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d={`M305.984.52a4.5 4.5 0 014.516 4.499V${safeHeight - 5}a4.5 4.5 0 01-4.5 4.5H9.144a4.5 4.5 0 01-4.5-4.5V8.809c0-1.361-.89-2.55-2.17-2.947l-.26-.068c-2.36-.513-2.079-3.892.207-4.111l.228-.012L305.984.52z`}
        stroke="#fff"
      />
    </Svg>
  );
}

export default DialogSvg;
