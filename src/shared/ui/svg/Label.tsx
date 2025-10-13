import * as React from 'react';
import Svg, { Path, Text } from 'react-native-svg';

type LabelSvgProps = {
  className?: string;
  label?: string;
  fill?: string;
  value?: number; // default 26 (giống viewBox của bạn)
  width?: number; // default 26 (giống viewBox của bạn)
  height?: number; // default 61 (giống viewBox của bạn)
};
const BASE_W = 26;
const BASE_H = 61;

const LabelSvg = ({ width = 26, height = 61, label, value, fill, ...rest }: LabelSvgProps) => {
  const sx = width / BASE_W;
  const sy = height / BASE_H;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...rest}>
      <Path
        d="M1 11.7483C1 7.98641 1 6.10546 1.436 4.66787C1.81949 3.40391 2.43139 2.37627 3.184 1.73223C4.04 1 5.16 1 7.4 1H18.6C20.84 1 21.96 1 22.816 1.73223C23.5686 2.37627 24.1805 3.40391 24.564 4.66787C25 6.10546 25 7.98641 25 11.7483V56.4379C25 58.0703 25 58.8865 24.798 59.3332C24.7107 59.5275 24.5993 59.6876 24.4716 59.8024C24.3438 59.9173 24.2027 59.9841 24.058 59.9983C23.724 60.0319 23.32 59.5784 22.512 58.6749L13 48.024L3.488 58.6715C2.68 59.5784 2.276 60.0319 1.94 59.9983C1.79567 59.9836 1.65495 59.9166 1.52754 59.8017C1.40014 59.6869 1.28907 59.5271 1.202 59.3332C1 58.8865 1 58.0703 1 56.4379V11.7483Z"
        fill={fill}
        // stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`scale(${sx} ${sy})`} // <-- kéo theo width/height
        vectorEffect="non-scaling-stroke" // giữ độ dày stroke nếu muốn
      />
      <Text
        x={13}
        y={43}
        textAnchor="middle"
        alignmentBaseline="baseline"
        fill="white"
        fontFamily="Baloo"
        fontSize={12}
        fontWeight="bold"
      >
        {label}
      </Text>
      <Text
        x={13}
        y={31}
        textAnchor="middle"
        alignmentBaseline="baseline"
        fill="white"
        fontFamily="Baloo"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </Text>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6667 8.22222C11.6667 7.89807 11.7954 7.58719 12.0246 7.35798C12.2539 7.12877 12.5647 7 12.8889 7H14.1111C14.4353 7 14.7461 7.12877 14.9754 7.35798C15.2046 7.58719 15.3333 7.89807 15.3333 8.22222V10.6667H17.7778C18.1019 10.6667 18.4128 10.7954 18.642 11.0246C18.8712 11.2539 19 11.5647 19 11.8889V13.1111C19 13.4353 18.8712 13.7461 18.642 13.9754C18.4128 14.2046 18.1019 14.3333 17.7778 14.3333H15.3333V16.7778C15.3333 17.1019 15.2046 17.4128 14.9754 17.642C14.7461 17.8712 14.4353 18 14.1111 18H12.8889C12.5647 18 12.2539 17.8712 12.0246 17.642C11.7954 17.4128 11.6667 17.1019 11.6667 16.7778V14.3333H9.22222C8.89807 14.3333 8.58719 14.2046 8.35798 13.9754C8.12877 13.7461 8 13.4353 8 13.1111V11.8889C8 11.5647 8.12877 11.2539 8.35798 11.0246C8.58719 10.7954 8.89807 10.6667 9.22222 10.6667H11.6667V8.22222Z"
        fill="white"
      />
    </Svg>
  );
};
export default LabelSvg;
