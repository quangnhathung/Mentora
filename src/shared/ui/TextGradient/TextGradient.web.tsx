import React from 'react';
import { Text, type TextProps } from 'react-native';

import Colors from '@/shared/ui/colors';

type TextGradientProps = {
  content: string;
  colors?: [string, string, ...string[]];
  start?: { x: number; y: number }; // dùng để suy ra hướng
  end?: { x: number; y: number };
  locations?: [number, number, ...number[]]; // không hỗ trợ trong bản web/className
} & TextProps;

/** Chuyển start/end (0-1) → tiện ích Tailwind bg-gradient-to-… */
const dirClass = (s: { x: number; y: number }, e: { x: number; y: number }) => {
  if (s.x === 0 && e.x === 1 && s.y === e.y) return 'bg-gradient-to-br'; // trái→phải
  if (s.x === 1 && e.x === 0 && s.y === e.y) return 'bg-gradient-to-br';
  if (s.y === 0 && e.y === 1 && s.x === e.x) return 'bg-gradient-to-br';
  if (s.y === 1 && e.y === 0 && s.x === e.x) return 'bg-gradient-to-br';
  // góc chéo – Tailwind không có sẵn, fallback về phải
  return 'bg-gradient-to-br';
};

/** Tạo utility đuôi from-/via-/to- (hỗ trợ màu HEX tùy ý) */
const colorClass = (prefix: 'from' | 'via' | 'to', color: string) =>
  `${prefix}-${color}`;

export const TextGradient = ({
  content,
  colors = [
    Colors.primary.DEFAULT,
    Colors.white.DEFAULT,
    Colors.primary.DEFAULT,
  ],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  className = '',
  ...rest
}: TextGradientProps) => {
  // ít nhất 2 màu mới cần gradient
  if (colors.length < 2)
    return (
      <Text {...rest} className={className}>
        {content}
      </Text>
    );

  // ghép class Tailwind
  const [c0, c1, c2] = colors;
  const gradientClasses = [
    'inline-block',
    dirClass(start, end),
    colorClass('from', c0),
    c2 ? colorClass('via', c1) : '',
    colorClass('to', c2 ?? c1),
    'bg-clip-text',
    'text-transparent',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Text {...rest} className={`${gradientClasses} ${className}`}>
      {content}
    </Text>
  );
};
