import { Pressable } from 'react-native-gesture-handler';

import { type Mission } from '@/entities/mission/types';
import { translate, type TxKeyPath } from '@/shared/lib';
import { epochToMonthYear } from '@/shared/lib/helpers/convertDate';
import { colors, Text, View } from '@/shared/ui';
import { ItemWithImage } from '@/shared/ui/Item/ItemWithImage';
import LabelSvg from '@/shared/ui/svg/Label';

type props = {
  data: Mission;
  onPress: (item: Mission) => void;
};

export const AchievementItem = ({ data, onPress }: props) => {
  const isFail = data?.status === 'failed';
  const title = data?.name;

  const textFailedStyle = isFail ? 'line-through' : '';

  return (
    <Pressable className={`w-full`} onPress={() => onPress(data)}>
      <ItemWithImage image={data?.image} isFail={isFail}>
        <View className="w-full flex-1 flex-col justify-between">
          <View className="pb-2">
            <Text numberOfLines={2} className={`h-10 w-[90%] text-sm ${textFailedStyle}`}>
              {translate(title as TxKeyPath)}
            </Text>
          </View>
          <Text className="dark:text-cyan">{epochToMonthYear(data?.completeDate!)}</Text>
        </View>
      </ItemWithImage>
      <LabelSvg
        className={`z-999 absolute -top-1 right-3`}
        value={30}
        label={translate('common.exp')}
        // fill={isCompleted ? colors.secondary.DEFAULT : colors.background.dark.light}
        fill={
          data?.level === 'easy'
            ? colors.green.DEFAULT
            : data?.level === 'medium'
              ? colors.yellow.DEFAULT
              : colors.red.DEFAULT
        }
      />
    </Pressable>
  );
};
