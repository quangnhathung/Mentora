import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SpeakingSvg(props: any) {
  return (
    <Svg
      width={16}
      height={14}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={9.00024} cy={7} r={6} fill="#fff" />
      <Path
        d="M9 .5a6.5 6.5 0 110 13H1.793l.854-.854 1.418-1.419a6.479 6.479 0 01-.942-1.447l-.13-.292A6.5 6.5 0 019 .5zm-.1 9.6h.2V3.9h-.2v6.2zm2.4-1.8h.2V5.7h-.2v2.6zm-4.8 0h.2V5.7h-.2v2.6z"
        fill="#9C8FFF"
        stroke="#fff"
      />
    </Svg>
  );
}

export default SpeakingSvg;
