import { View } from 'react-native';

import { type UserStats } from '@/entities/user/types';
import { translate } from '@/shared/lib';
import { Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

type StatProps = { icon: IconName; value: string; label: string };
const Stat = ({ icon, value, label }: StatProps) => (
  <View className="min-w-[31.5%]">
    <BottomBorder className={`border-custom-5-light rounded-2xl`}>
      <GradientView
        colors={['primary-dark', 'primary', 'primary-light']}
        containerClassName={`overflow-hidden rounded-xl`}
        className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
      >
        <View className={`flex-row items-center gap-1 p-2`}>
          <SvgIcon name={icon} size={24} />
          <View className={`flex-col`}>
            <Text className="mt-2 text-white">{value}</Text>
            <Text className="text-xs dark:text-cyan">{label}</Text>
          </View>
        </View>
      </GradientView>
    </BottomBorder>
  </View>
);

export const ProfileStatsRow = ({ stats }: { stats: UserStats }) => (
  <View className="mt-5 w-full flex-row flex-wrap justify-between gap-2">
    <Stat icon="flame" value={`${stats?.streak || '----'}`} label={translate('common.streak')} />
    <Stat icon="credit" value={`${stats?.credit || '----'}`} label={translate('common.credit')} />
    <Stat icon="star" value={`${stats?.star || '----'}`} label={translate('common.star')} />
    <Stat icon="book" value={`${stats?.lesson || '----'}`} label={translate('common.lesson')} />
    <Stat
      icon="mission"
      value={`${stats?.mission || '----'}`}
      label={translate('common.mission')}
    />
    <Stat
      icon="leaderboard"
      value={`${stats?.leaderboard || '----'}`}
      label={translate('common.best_position')}
    />
  </View>
);
