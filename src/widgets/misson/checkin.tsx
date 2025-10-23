import { router } from 'expo-router';

import { Text, TouchableOpacity, View } from '@/shared/ui';
import { type DailyCheckinType } from '@/shared/ui/mission/CheckinBlock';
import { CheckinBlock } from '@/shared/ui/mission/CheckinBlock';
import { SvgIcon } from '@/shared/ui/SvgIcon';

const CheckinMockData: DailyCheckinType[] = [
  { id: 'Mon', isChecked: true },
  { id: 'Tue', isChecked: true },
  { id: 'Wed', isMiss: true },
  { id: 'Thu' },
  { id: 'Fri' },
  { id: 'Sat' },
  { id: 'Sun' },
];

export const Checkin = () => {
  return (
    <View className="w-ful m-0 border-b p-0">
      <View className="w-full flex-row gap-1 px-3">
        <SvgIcon name="calendar" size={24} color="#5A6D93" />
        <Text className="font-bold">Điểm danh đủ 7 ngày để nhận ngay 15</Text>
        <SvgIcon name="coin" />
      </View>
      <View className="w-full flex-row justify-center gap-3 py-3">
        {CheckinMockData.map((item) => (
          <CheckinBlock
            key={item.id}
            id={item.id}
            isChecked={item.isChecked}
            isMiss={item.isMiss}
          />
        ))}
      </View>
      <View className="flex-col items-center justify-center">
        <Text className="text-[12px]">Hoàn thành nhiệm vụ hằng ngày để điểm danh</Text>
        <TouchableOpacity
          className="mb-3 mt-2 rounded-xl bg-secondary p-1 px-8"
          onPress={() => {
            router.push('/(tabs)/(mission)/checkin');
          }}
        >
          <Text className="font-bold dark:text-white">Làm ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
