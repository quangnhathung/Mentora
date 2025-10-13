import { Pressable } from 'react-native';

import BottomBorder from '@/shared/ui/BottomBorder';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';
import { Text } from '@/shared/ui/text';

type ChipProps = {
  value: string | number;
  title: string;
  icon: IconName;
  active: boolean;
  dark?: boolean;
  size?: number;
  onPress?: (val: any) => void;
};

export const Chip = ({
  value,
  dark = false,
  title,
  icon,
  size = 14,
  active,
  onPress,
}: ChipProps) => (
  <BottomBorder className={`border-custom-3 rounded-3xl`}>
    <Pressable
      onPress={() => onPress?.(value)}
      className={`flex-row items-center justify-between gap-2 rounded-full px-2 py-1 ${active ? 'bg-secondary' : dark ? 'bg-background-dark' : 'bg-background-dark-light'}`}
    >
      <SvgIcon size={size} name={icon} />
      <Text className="min-w-5 capitalize">{title}</Text>
    </Pressable>
  </BottomBorder>
);
