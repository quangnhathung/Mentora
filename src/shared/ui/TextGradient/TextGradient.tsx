import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { type TextProps } from 'react-native';

import { twColor } from '@/shared/lib/twColor';
import Colors from '@/shared/ui/colors';
import { Text } from '@/shared/ui/text';

type TextGradientProps = {
  content: string;
  colors?: [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: [number, number, ...number[]];
} & TextProps;

export const TextGradient = ({
  content,
  colors = [Colors.primary.DEFAULT, Colors.white.DEFAULT, Colors.primary.DEFAULT],
  locations = [0, 0.47, 1],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  className,
  ...props
}: TextGradientProps) => {
  if (colors.length < 2)
    return (
      <Text {...props} className={`${className}`}>
        {content}
      </Text>
    );

  const gradientStops = [...colors].map((token) => twColor(token));

  return (
    <MaskedView
      maskElement={
        <Text {...props} className={`${className}`}>
          {content}
        </Text>
      }
    >
      <LinearGradient
        colors={gradientStops as [string, string, ...string[]]}
        start={start}
        end={end}
        locations={locations}
      >
        <Text {...props} className={`${className} opacity-0`}>
          {content}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};
