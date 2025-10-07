import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { twMerge } from 'tailwind-merge';
type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textStyle?: string;
};

export const DarkButton = ({
  title,
  onPress,
  disabled,
  loading,
  className,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={twMerge(
        `y items-center justify-center rounded-xl bg-background-dark px-4 py-3 ${className} ${disabled && `bg-opacity`} `
      )}
    >
      <Text
        className={`font-bevietnampro-semibold text-base text-white ${textStyle}`}
      >
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};
