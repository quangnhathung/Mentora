import Svg, {
  Circle,
  ClipPath,
  Defs,
  Image,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text,
} from 'react-native-svg';

import { colors } from '@/shared/ui';

type Props = {
  percent: number; // 0..100
  image: string; // 0..100
  size?: number; // default 126 (giống viewBox của bạn)
  imgSize?: number; // default 90 (giống viewBox của bạn)
  showPercent?: boolean; // default true (giống viewBox của bạn)
  strokeWidth?: number; // 8
};

const clampPercent = (p: number) => Math.max(0, Math.min(100, p));

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

// eslint-disable-next-line max-params
const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const a = deg2rad(angleDeg);
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
};

/**
 * Trả về path cho 0..100% của 1 vòng tròn (bắt đầu ở -90° = 12h).
 * Đồng thời trả về toạ độ điểm cuối để bạn đặt "đầu mút".
 */
// eslint-disable-next-line max-params
function buildArc(
  cx: number,
  cy: number,
  r: number,
  percent: number,
  startAngle = -90,
  direction: 'cw' | 'ccw' = 'cw'
) {
  const clamped = clampPercent(percent);
  const p = clamped / 100;

  if (p === 0) return { d: '', end: polarToCartesian(cx, cy, r, startAngle) };

  const delta = p * 360;
  const endAngle = direction === 'cw' ? startAngle + delta : startAngle - delta;

  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);

  const largeArcFlag = p > 0.5 ? 1 : 0;
  const sweepFlag = direction === 'cw' ? 1 : 0;

  // Lưu ý: A không vẽ được đúng 360°. Nếu p===1, dùng 2 cung.
  if (p === 1) {
    const midAngle = direction === 'cw' ? startAngle + 180 : startAngle - 180;
    const mid = polarToCartesian(cx, cy, r, midAngle);
    const dFull =
      `M ${start.x} ${start.y} ` +
      `A ${r} ${r} 0 1 ${sweepFlag} ${mid.x} ${mid.y} ` +
      `A ${r} ${r} 0 1 ${sweepFlag} ${start.x} ${start.y}`;
    return { d: dFull, end: start }; // đầu mút quay lại điểm start
  }

  const d = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  return { d, end };
}

const UserAvatar = ({
  percent = 0,
  image,
  size = 126,
  imgSize = 90,
  showPercent = true,
  strokeWidth = 8,
}: Props) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = cx - 10; // trừ padding để stroke không bị cắt (tuỳ bạn)

  const rect = { x: 47, y: 1, width: 29, height: 19 };

  const { d, end } = buildArc(cx, cy, r, percent, -90, 'ccw');

  const PATH_CENTER = { x: 118.5005, y: 62.9681 };
  const imgW = imgSize; // kích thước icon/ảnh bạn muốn
  const imgH = imgSize;
  const rImg = Math.min(imgW, imgH) / 2;

  return (
    <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* track nền */}
      <Circle cx={cx} cy={cy} r={r} stroke="white" strokeWidth={size < 80 ? 2 : 4} fill="none" />

      {/* progress path theo % */}
      {d ? (
        <Path
          d={d}
          stroke="url(#paint0_linear)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      ) : null}

      {/* “đầu mút” (nếu p > 0) */}
      {percent > 0 && strokeWidth >= 8 && (
        <Circle
          cx={end.x}
          cy={end.y}
          r={7.5}
          fill="url(#paint1_linear)"
          stroke="white"
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {percent > 0 && strokeWidth >= 8 && (
        <Path
          d="M121.448 62.9811L119.176 61.6646L120.322 58.9163C120.362 58.8346 120.38 58.7442 120.376 58.6534C120.371 58.5627 120.344 58.4745 120.296 58.3972C120.248 58.32 120.181 58.2561 120.102 58.2116C120.023 58.1671 119.934 58.1434 119.843 58.1428C119.722 58.1424 119.604 58.1828 119.509 58.2574L119.472 58.2896L115.453 62.0925C115.393 62.1499 115.347 62.2205 115.318 62.2988C115.29 62.3771 115.28 62.4609 115.29 62.5436C115.299 62.6264 115.328 62.7057 115.374 62.7754C115.419 62.8451 115.48 62.9033 115.552 62.9452L117.825 64.2629L116.666 67.0428C116.619 67.1562 116.611 67.2826 116.646 67.4007C116.68 67.5188 116.755 67.6214 116.856 67.6912C116.957 67.761 117.08 67.7938 117.202 67.784C117.325 67.7742 117.441 67.7224 117.53 67.6373L121.548 63.8333C121.608 63.7759 121.654 63.7053 121.683 63.627C121.711 63.5488 121.721 63.465 121.711 63.3824C121.701 63.2997 121.673 63.2204 121.627 63.1508C121.581 63.0812 121.52 63.0231 121.448 62.9811Z"
          fill="white"
          transform={`translate(${end.x - PATH_CENTER.x} ${end.y - PATH_CENTER.y})`}
        />
      )}

      {/* label */}
      <Defs>
        <ClipPath id="clipCenterImage">
          <Circle cx={cx} cy={cy} r={rImg} />
        </ClipPath>
      </Defs>
      <Image
        x={cx - imgW / 2}
        y={cy - imgH / 2}
        width={imgW}
        height={imgH}
        href={image}
        preserveAspectRatio="xMidYMid slice" // lấp đầy khung, giữ tỉ lệ
        clipPath="url(#clipCenterImage)"
      />
      {/* Viền mỏng quanh ảnh */}
      <Circle
        cx={cx}
        cy={cy}
        r={rImg}
        fill="none"
        stroke="none"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />

      {showPercent && (
        <Rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={4}
          fill={colors.primary.DEFAULT}
          stroke="white"
          strokeWidth={2}
        />
      )}

      {showPercent && (
        <Text
          x={rect.x + rect.width / 2}
          y={rect.y + rect.height / 2 + 3}
          textAnchor="middle"
          alignmentBaseline="baseline"
          fill="white"
          fontFamily="BeVietnamPro"
          fontSize={10}
          fontWeight="bold"
        >
          {`${percent}%`}
        </Text>
      )}

      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={0}
          y1={cy}
          x2={size}
          y2={cy}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={colors.primary.dark} />
          <Stop offset={0.475} stopColor={colors.primary.light} />
          <Stop offset={1} stopColor={colors.primary.DEFAULT} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear"
          x1={cx - 7.5}
          y1={cy}
          x2={cx + 7.5}
          y2={cy}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={colors.primary.dark} />
          <Stop offset={0.475} stopColor={colors.primary.light} />
          <Stop offset={1} stopColor={colors.primary.DEFAULT} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default UserAvatar;
