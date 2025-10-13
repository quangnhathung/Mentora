import Svg, { Path } from 'react-native-svg';

function HeartSvg(props: any) {
  return (
    <Svg
      width={25}
      height={22}
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.821 2.508C16.116.14 19.797-.213 22.25 1.875v.001c2.755 2.351 2.984 6.52.676 9.172l-.232.25-9.448 9.757a1.03 1.03 0 01-1.413.075l-.081-.075-9.448-9.756c-2.467-2.55-2.401-6.725.19-9.19l.259-.233C5.127-.148 8.66.12 10.96 2.291l.219.217.962.991.359.37.358-.37.962-.991z"
        fill="#FF6969"
        stroke="#fff"
      />
    </Svg>
  );
}

export default HeartSvg;
