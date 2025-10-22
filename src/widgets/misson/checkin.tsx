import { Text, View } from '@/shared/ui';
import { SvgIcon } from '@/shared/ui/SvgIcon';

export const Checkin = () => {
  return (
    <View className="w-full border-b px-3">
      <SvgIcon name="calendar" size={16} color="#5A6D93" />
      <Text>Điểm danh đủ 7 ngày để nhận ngay 15</Text>
      <SvgIcon name="coin" />
    </View>
  );
};
