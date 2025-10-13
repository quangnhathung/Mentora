import { Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';

type props = {
  isCheckIn: boolean;
  title: string;
  className?: string;
};

export const DailyBlock = ({ isCheckIn, title, className }: props) => {
  const checkedStyle = isCheckIn ? 'bg-secondary' : 'bg-white';
  return (
    <BottomBorder className={`border-custom-5 rounded-b-2xl`}>
      <View
        className={`${className} w-full flex-col items-center justify-between rounded-2xl bg-background-dark-light pb-2`}
      >
        <Text className="py-2 text-center">{title}</Text>
        <View className={`size-2 rounded-full ${checkedStyle}`} />
      </View>
    </BottomBorder>
  );
};
