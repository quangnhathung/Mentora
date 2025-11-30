import { View } from 'react-native';

import { type UserStats } from '@/entities/user/types';
import { translate } from '@/shared/lib';
import { Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

type StatProps = { icon: IconName; value: string; label: string };
const Stat = ({ icon, value, label }: StatProps) => (
  <View className="min-w-[31.5%] flex-1">
    <BottomBorder className={`border-custom-5 rounded-2xl`}>
      <GradientView
        colors={['#44C1D7', '#F8AAD3']}
        containerClassName={`overflow-hidden rounded-xl`}
      >
        <View className={`flex-row items-center gap-1 p-2`}>
          <SvgIcon name={icon} size={24} />
          <View className={`flex-col`}>
            <Text className="text-white">{value}</Text>
            <Text className="text-base">{label}</Text>
          </View>
        </View>
      </GradientView>
    </BottomBorder>
  </View>
);

export const ProfileStatsRow = ({ stats }: { stats: UserStats }) => (
  <View className="mt-5 w-full flex-row flex-wrap justify-between gap-2">
    <Stat icon="flame" value={`${stats?.streak ?? '----'}`} label={translate('common.streak')} />
    <Stat icon="coin" value={`${stats?.coins ?? '----'}`} label="Coins" />
  </View>
);
