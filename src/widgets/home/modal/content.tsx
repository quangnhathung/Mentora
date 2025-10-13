import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { vars } from 'nativewind';

import { useUserData } from '@/entities/user/model';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { ActivityIndicator, Text, View } from '@/shared/ui';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

import { Achive } from './achive';
import { AchiveWrapper } from './wrapper';

type Props = {
  modalRef: React.RefObject<BottomSheetModal>;
};

export const HomeModalContent = ({ modalRef }: Props) => {
  const { data, isLoading, isError } = useUserData.getCurrentPathInfo();
  if (isLoading) return <ActivityIndicator className="flex-1 items-center" />;
  if (isError) return <Text>Error</Text>;
  const moderateSize = vars({
    '--c-30': `${moderateScale(30)}px`,
  });
  const PathsProgress = data?.data;

  return (
    <View style={moderateSize} className="mt-5">
      {PathsProgress?.map((item) => (
        <AchiveWrapper className="my-1" key={item.id} status={item.status} title={item.title}>
          <Text className="font-bevietnampro text-sm">{item.description}</Text>
          <Text className="my-3 font-bevietnampro text-sm font-bold">You Will Achieve:</Text>
          {/* <AchiveList /> */}
          <View className="mt-2 w-full flex-col gap-2 px-2 pb-4">
            {item.content.map((item) => (
              <Achive key={item.id} icon={item.icon} title={item.title} desc={item.description} />
            ))}
          </View>
          <View className="w-full flex-row gap-2 px-3 pb-2">
            <PrimaryButton
              title={translate('pathprogresmodal.buttons.performance')}
              className={`my-1 flex-1`}
              textStyle={`text-sm`}
              onPress={() => {
                router.push('/(tabs)/(profile)/performance');
                modalRef.current?.dismiss();
              }}
            />
            <PrimaryButton
              title={translate('pathprogresmodal.buttons.review')}
              className={`my-1 flex-1`}
              textStyle={`text-sm`}
              onPress={() => {}}
            />
          </View>
        </AchiveWrapper>
      ))}
    </View>
  );
};
