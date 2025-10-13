import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CorrectAnswerSvg(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18A9 9 0 109 0a9 9 0 000 18zm-.232-5.36l5-6-1.536-1.28-4.3 5.159-2.225-2.226-1.414 1.414 3 3 .774.774.701-.841z"
        fill="#9C8FFF"
      />
    </Svg>
  );
}

export default CorrectAnswerSvg;
