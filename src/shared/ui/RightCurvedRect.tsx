// RightCurvedRect.tsx
import React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type Props = {
  height?: number; // chiều cao thực tế (px)
  style?: StyleProp<ViewStyle>;
  curve?: number; // 0..50 (% bề ngang) độ lõm vào ở cạnh phải
  topCtrl?: number; // 0..100 (% chiều cao) điểm control trên
  bottomCtrl?: number; // 0..100 (% chiều cao) điểm control dưới
  fillStart?: string; // màu đầu gradient
  fillEnd?: string; // màu cuối gradient
};

export default function RightCurvedRect({
  height = 120,
  style,
  curve = 18, // thử 16–24 cho dáng giống hình
  topCtrl = 25,
  bottomCtrl = 75,
  fillStart = '#FFA500', // cam đậm
  fillEnd = '#FFC84D', // cam nhạt
}: Props) {
  // Làm việc trong hệ tọa độ viewBox 0..100 (ngang) x 0..100 (dọc)
  const c = Math.max(0, Math.min(50, curve)); // % lõm vào (0..50)
  const top = Math.max(0, Math.min(100, topCtrl));
  const bot = Math.max(0, Math.min(100, bottomCtrl));

  // Đường bao:
  // M 0,0  → H 100 → cạnh phải cong xuống  → H 0 → Z
  // Cong bằng cubic Bézier: hai control ở (100 - c, top) và (100 - c, bot)
  const d = `
    M 0 0
    H 100
    C ${100 - c} ${top}, ${100 - c} ${bot}, 100 100
    H 0
    Z
  `.replace(/\s+/g, ' ');

  return (
    <View style={[{ width: '100%' }, style]}>
      <Svg
        width="100%"
        height={height}
        viewBox="0 0 100 100"
        preserveAspectRatio="none" // co giãn theo parent, vẫn giữ 100% width
      >
        <Defs>
          <LinearGradient id="og" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={fillStart} />
            <Stop offset="100%" stopColor={fillEnd} />
          </LinearGradient>
        </Defs>

        {/* Hình chữ nhật có cạnh phải cong */}
        <Path d={d} fill="url(#og)" />
      </Svg>
    </View>
  );
}
