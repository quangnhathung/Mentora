// shared/ui/mission/CheckinBlock.tsx
import { Text, View } from '@/shared/ui';

export const CheckinBlock = ({
  id,
  isChecked = false,
  isMiss = false,
}: {
  id: string;
  isChecked?: boolean;
  isMiss?: boolean;
}) => {
  const BgCommon = isChecked ? 'bg-[#A855F7]' : isMiss ? 'bg-[#E9D5FF]' : 'bg-background-dark';
  const BgCheck = isChecked ? 'bg-[#FBBC05]' : isMiss ? 'bg-[#CBD5E1]' : 'bg-white';

  return (
    <View
      className={`${BgCommon} h-[48px] w-[36px] flex-col items-center justify-center gap-1 rounded-2xl`}
    >
      <Text
        className={`font-baloo ${isMiss ? 'dark:text-[#9CA3AF]' : ''} ${isChecked ? 'dark:text-white' : ''}`}
      >
        {id}
      </Text>
      <View className={`size-3 rounded-full ${BgCheck}`}></View>
    </View>
  );
};
