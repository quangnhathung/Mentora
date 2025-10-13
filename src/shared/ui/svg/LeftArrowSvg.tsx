import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { moderateScale } from '@/shared/lib/helpers/scale';

function LeftArrowSvg({ size = 22, ...props }: any) {
  return (
    <Svg
      onLayout={() => {
        // const { width, height } = event.nativeEvent.layout;
        // console.log(width, height);
      }}
      width={moderateScale(size)}
      height={moderateScale(size)}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.576 19.895l-1.084 1.084a1.167 1.167 0 01-1.656 0L.344 11.492a1.167 1.167 0 010-1.656L9.836.344a1.167 1.167 0 011.656 0l1.084 1.084c.463.464.454 1.22-.02 1.675L6.672 8.709h14.034c.649 0 1.171.522 1.171 1.171v1.563c0 .65-.522 1.172-1.171 1.172H6.672l5.884 5.605c.479.454.488 1.211.02 1.675z"
        fill="#fff"
      />
    </Svg>
  );
}

export default LeftArrowSvg;
