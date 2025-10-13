import { Text, TouchableOpacity } from 'react-native';
import { twMerge } from 'tailwind-merge';

import BottomBorder from '@/shared/ui/BottomBorder';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textStyle?: string;
};

export const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  loading,
  className,
  textStyle,
}: Props) => {
  return (
    <BottomBorder
      className={twMerge(
        `${disabled !== true ? `border-custom-5` : `border-custom-5-light`} rounded-2xl`,
        className
      )}
    >
      <TouchableOpacity
        className={twMerge(
          `items-center justify-center rounded-xl bg-primary px-4 py-3 ${disabled && `bg-opacity`} `
        )}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <Text className={`font-bevietnampro-semibold text-base text-white ${textStyle}`}>
          {loading ? 'Loading...' : title}
        </Text>
      </TouchableOpacity>
    </BottomBorder>
  );
};
