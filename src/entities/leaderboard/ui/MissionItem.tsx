import { type Mission } from '@/entities/mission/types';
import { translate, type TxKeyPath } from '@/shared/lib';
import { colors, ProgressBar, Text, View } from '@/shared/ui';
import { ItemWithImage } from '@/shared/ui/Item/ItemWithImage';
import LabelSvg from '@/shared/ui/svg/Label';

type props = {
  data: Mission;
};

export const MissionItem = ({ data }: props) => {
  const isCompleted = data?.status === 'complete' || data?.status === 'claimed';
  const isFail = data?.status === 'failed';
  const isAvailable = data?.status === 'available';
  const title = data?.name;
  const target = data?.progress.target;
  const currentProcess = data?.progress.current;

  const process = Number((currentProcess / target).toFixed(2));

  const textFailedStyle = isFail ? 'line-through' : '';

  return (
    <View>
      <ItemWithImage image={data.image} isFail={isFail}>
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
            <Text className="text-xs dark:text-red">{translate('mission.status.failed')}</Text>
          ) : isAvailable ? (
            <Text className="text-xs dark:text-dark">{translate('mission.status.available')}</Text>
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
    </View>
  );
};
