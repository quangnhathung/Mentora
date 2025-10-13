import { LinearGradient } from 'expo-linear-gradient';
import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { twColor } from '@/shared/lib/twColor';
import Colors from '@/shared/ui/colors';

type GradientViewProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: [string, string];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: [number, number];
} & ViewProps;

export const GradientView = ({
  children,
  className,
  containerClassName,
  colors = [Colors.primary.DEFAULT, Colors.white.DEFAULT],
  locations = [0, 1], // ✅ chỉ 2 giá trị
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  ...rest
}: GradientViewProps) => {
  const gradientStops = colors.map((token) => twColor(token));

  return (
    <View className={twMerge('overflow-hidden', containerClassName)}>
      <LinearGradient
        className={className}
        colors={gradientStops as [string, string, ...string[]]}
        locations={locations}
        start={start}
        end={end}
        pointerEvents="box-none"
        {...rest}
      >
        {children}
      </LinearGradient>
    </View>
  );
};
