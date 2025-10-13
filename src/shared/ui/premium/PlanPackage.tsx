import { type Plan } from '@/entities/premium/types';
import { Text, View } from '@/shared/ui';

import BottomBorder from '../BottomBorder';

type Props = {
  item?: Plan;
  className?: string;
  isChoose?: boolean;
};

export const PlanPackage = ({ item, className, isChoose }: Props) => {
  return (
    <BottomBorder className={`${className} border-custom-5 relative flex-1 rounded-xl`}>
      <View
        className={`${className} relative items-center justify-center rounded-xl ${isChoose ? 'bg-secondary' : 'bg-background-dark-light'} p-7`}
      >
        <View className="w-full flex-row justify-between">
          <View className="flex-col">
            <Text className="m-0 p-0 font-baloo text-lg">{item?.expireTime}</Text>
            <Text className="p-0 font-bevietnampro text-base dark:text-cyan">{item?.sale}</Text>
          </View>
          <View className="">
            <Text className="text-right font-baloo text-base line-through dark:text-gray">
              {item?.oldPrice}
            </Text>
            <Text className="font=baloo -mt-2 text-lg">{item?.newPrice}</Text>
          </View>
        </View>
        {item?.outstanding === true && (
          <View className="absolute right-7 top-1">
            <Text className="font-bevietnampro font-bold dark:text-red">Best Choice</Text>
          </View>
        )}
      </View>
    </BottomBorder>
  );
};
