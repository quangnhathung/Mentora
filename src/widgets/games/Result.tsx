import { Text, View } from '@/shared/ui';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { SvgIcon } from '@/shared/ui/SvgIcon';

type props = {
  point: number;
  handleNext: () => void;
  handleReset: () => void;
};

export const ResultContent = ({ point, handleNext, handleReset }: props) => {
  return (
    <View className="-mt-5 flex-1 items-center justify-between">
      <View className="w-full items-center justify-between">
        <SvgIcon name="congratulation" size={120} />
        <Text className="-mt-5 font-baloo text-2xl dark:text-cyan">Congratulation</Text>
        <Text className="font-baloo text-base">Congratulations you have received</Text>
        <View className="flex-row items-center justify-center gap-1">
          <Text className="font-baloo text-[60px] dark:text-cyan">{point}</Text>
          <SvgIcon name="reward" size={40} />
        </View>
      </View>

      <View className="mb-3 w-full flex-row gap-2 px-3">
        <SecondaryButton
          title={'continue'}
          className={`my-2 flex-1 border-2 border-white`}
          textStyle={`uppercase`}
          onPress={handleNext}
        />
        <SecondaryButton
          title={'play again'}
          className={`my-2 flex-1 border-2 border-white`}
          textStyle={`uppercase`}
          onPress={handleReset}
        />
      </View>
    </View>
  );
};
