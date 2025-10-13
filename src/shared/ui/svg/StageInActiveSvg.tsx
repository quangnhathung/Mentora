import Svg, { Path } from 'react-native-svg';

function StageInActiveSvg({ width = 113, height = 76, ...props }: any) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 46.153v10.044l32.891 19.114V65.267L0 46.153z" fill="#BABABA" />
      <Path
        d="M33.249.003L.148 19.119 0 46.153l32.891 19.114 46.671-.003 33.106-19.119.152-27.031L79.92 0 33.249.003z"
        fill="#fff"
      />
      <Path
        d="M79.562 65.266h-46.67V75.31h46.67V65.266zM79.562 65.264v10.044l33.106-19.119V46.145L79.562 65.264z"
        fill="#BABABA"
      />
    </Svg>
  );
}

export default StageInActiveSvg;
