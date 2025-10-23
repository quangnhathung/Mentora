import { Text, View } from '@/shared/ui';

export type DailyCheckinType = {
  id: string;
  isMiss?: boolean;
  isChecked?: boolean;
};

export const CheckinBlock = ({ id, isMiss, isChecked }: DailyCheckinType) => {
  const BgCommon = isChecked ? 'bg-[#A855F7]' : isMiss ? 'bg-[#E9D5FF]' : ' bg-background-dark';

  const Bgcheck = isChecked ? 'bg-[#FBBC05]' : isMiss ? 'bg-[#CBD5E1]' : ' bg-white';

  return (
    <View
      className={`${BgCommon} h-[48px] w-[36px] flex-col items-center justify-center gap-1 rounded-2xl`}
    >
      <Text
        className={`font-baloo ${isMiss ? 'dark:text-[#9CA3AF]' : ''} ${isChecked ? 'dark:text-white' : ''}`}
      >
        {id}
      </Text>
      <View className={`size-3 rounded-full ${Bgcheck}`}></View>
    </View>
  );
};
