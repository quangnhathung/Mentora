import { type Benefit } from '@/entities/premium/types';
import { Image, Text, View } from '@/shared/ui';

import { SvgIcon } from '../SvgIcon';

type Props = {
  item?: Benefit;
  className?: string;
};

export const BenefitPackage = ({ item, className }: Props) => {
  return (
    <View className={`${className} py-2`}>
      <View className="flex-row items-center gap-5">
        <Image source={{ uri: item?.img }} className="size-20" />

        <View className="flex-1 pr-2">
          <Text className="font-baloo text-lg">{item?.title}</Text>
          <Text className="font-bevietnampro">{item?.desc}</Text>
        </View>
      </View>

      <View className="gap-2 px-3 pt-4">
        {item?.content?.map((c, i) => (
          <View className="flex-row gap-3" key={i}>
            <SvgIcon name="checked" />
            <Text className="flex-1">{c}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
