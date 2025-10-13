import { type TextProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type GradientViewProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
} & TextProps;

export const GradientView = ({
  children,
  containerClassName,
  className = '',
}: GradientViewProps) => {
  return (
    <View pointerEvents="box-none" className={twMerge(`${className} ${containerClassName}`)}>
      {children}
    </View>
  );
};
