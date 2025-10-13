import { vars } from 'nativewind';
import { View } from 'react-native';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image, Text } from '@/shared/ui';

type AchiveModalProps = { icon: string; title: string; desc: string };

const moderateSize = vars({
  '--c-30': `${moderateScale(30)}px`,
});

export const Achive = ({ icon, title, desc }: AchiveModalProps) => (
  <View style={moderateSize} className="flex-row items-center">
    <View className="size-[--c-30] items-center justify-center rounded-full bg-white">
      <Image source={icon} className="size-[20px]" />
    </View>
    <View className="px-4">
      <Text className="font-bevietnampro text-sm text-white">{title}</Text>
      <Text className="font-bevietnampro text-xs dark:text-[#BABABA]">{desc}</Text>
    </View>
  </View>
);
