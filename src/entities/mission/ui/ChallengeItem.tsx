import { StyleSheet } from 'react-native';

import { type Mission } from '@/entities/mission/types';
import { translate, type TxKeyPath } from '@/shared/lib';
import { ConditionalWrapper } from '@/shared/lib/hocs/ConditionalWrapper';
import { colors, Image, ProgressBar, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import LabelSvg from '@/shared/ui/svg/Label';

type props = {
  data: Mission;
};

export const ChallengeItem = ({ data }: props) => {
  const isCompleted = data?.status === 'complete' || data?.status === 'claimed';
  const isFail = data?.status === 'failed';
  const isAvailable = data?.status === 'available';
  const title = data?.name;
  const target = data?.progress.target;
  const currentProcess = data?.progress.current;

  const process = Number((currentProcess / target).toFixed(2));

  const textFailedStyle = isFail ? 'line-through' : '';

  const withCondition = (c: React.ReactNode, condition: boolean) => {
    return condition ? (
      <GradientView
        colors={['secondary-dark', 'secondary']}
        containerClassName={`rounded-xl`}
        className={`w-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light`}
      >
        {c}
      </GradientView>
    ) : (
      <View className={`w-full rounded-xl bg-background-gray`}>{c}</View>
    );
  };

  return (
    <BottomBorder className={`border-custom-5-light rounded-b-2xl`}>
      <View>
        <GradientView
          colors={['primary-dark', 'primary']}
          containerClassName={`rounded-xl`}
          className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
        >
          <ConditionalWrapper condition={!isFail} wrapper={withCondition}>
            <View className={`w-full flex-row`}>
              <View className={`items-center justify-center overflow-hidden rounded-xl p-4`}>
                <GradientView
                  colors={['secondary-dark', 'secondary']}
                  style={StyleSheet.absoluteFillObject}
                  containerClassName={`absolute inset-0`}
                  className={`rounded-xl bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light`}
                />
                <Image
                  source={`https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg`}
                  className={`size-[75px] rounded-full`}
                />
              </View>
              <View className="flex-1 p-3">
                <View className="">
                  <Text numberOfLines={2} className={`h-10 w-[90%] text-sm ${textFailedStyle}`}>
                    {translate(title as TxKeyPath)}
                  </Text>
                </View>

                <View className="flex-col justify-between">
                  {isCompleted || isCompleted ? (
                    <Text className="text-xs dark:text-secondary">
                      {translate(`mission.status.${data?.status}`)}
                    </Text>
                  ) : isFail ? (
                    <Text className="text-xs dark:text-red">
                      {translate('mission.status.failed')}
                    </Text>
                  ) : isAvailable ? (
                    <Text className="text-xs dark:text-dark">
                      {translate('mission.status.available')}
                    </Text>
                  ) : (
                    <Text className="text-xs dark:text-dark">
                      {translate(`mission.status.${data?.status}`)}
                    </Text>
                  )}
                  <View className="flex-row justify-between py-1">
                    <Text className="text-xs">
                      {currentProcess} / {target}
                    </Text>
                    <Text className="text-xs dark:text-cyan">{process * 100}%</Text>
                  </View>
                </View>

                <ProgressBar
                  initialProgress={process * 100}
                  empty={isAvailable}
                  height={8}
                  className="w-full"
                />
              </View>
            </View>
          </ConditionalWrapper>
          <View className={`flex-row items-center justify-between px-4 py-2`}>
            <Text
              txRich={{
                defaults: data?.desc!,
              }}
              className={`w-2/3 text-sm`}
            />
            <View className={`flex-1 items-center justify-center`}>
              <Image
                source={`https://static.saoladigital.com/public/mtt-mobile-app/images/demo/challenge-1.png`}
                contentFit="contain"
                className={`min-h-[100px] w-full`}
              />
            </View>
          </View>
        </GradientView>
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
      </View>
    </BottomBorder>
  );
};
