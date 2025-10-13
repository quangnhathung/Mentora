import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TickSvg(props: any) {
  return (
    <Svg
      width={10}
      height={8}
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.396 7.843L.146 4.356a.564.564 0 010-.758l.708-.759a.476.476 0 01.707 0L3.75 5.188 8.44.158a.476.476 0 01.706 0l.708.758c.195.21.195.549 0 .758l-5.75 6.169a.476.476 0 01-.708 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default TickSvg;
