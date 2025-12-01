import CartSvg from '@assets/images/svgs/Cart.svg';
import SettingSvg from '@assets/images/svgs/setting.svg';
import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { useUserStore } from '@/entities/user/useUserStore';
import { translate, type TxKeyPath } from '@/shared/lib';
import { Env } from '@/shared/lib/env';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text } from '@/shared/ui';
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { ProfileHeader } from '@/widgets/profile/ProfileHeader';
import { ProfileMenu } from '@/widgets/profile/ProfileMenu';
import { ProfileStatsRow } from '@/widgets/profile/ProfileStatsRow';

type ProfileMenuProp = {
  id: number;
  screenName: string;
  title: TxKeyPath;
  description: string;
  choices: ChoiceBase[];
};

const profileMenuMock: ProfileMenuProp[] = [
  {
    id: 1,
    screenName: 'Choose your native language',
    title: 'profile.heading.account',
    description: 'Choose your native language',
    choices: [
      {
        id: 1,
        value: 'profile',
        description: `<p class="justify-start"><span class="text-black text-sm">${translate('profile.menu.profile')}</span></p>`,
        icon: 'profile',
      },
      {
        id: 2,
        value: 'performance',
        description: `<p class="justify-start"><span class=" text-sm">${translate('profile.menu.performance')}</span></p>`,
        icon: 'performance',
      },
      {
        id: 3,
        value: 'help',
        description: `<p class="justify-start"><span class=" text-sm">${translate('profile.menu.help')}</span></p>`,
        icon: 'help',
      },
      {
        id: 4,
        value: 'logout',
        description: `<p class="justify-start"><span class=" text-sm">${translate('profile.menu.logout')}</span></p>`,
        icon: 'logout',
      },
    ],
  },
];

const ProfileScreen = () => {
  const [profileMenu, _] = useState(profileMenuMock);
  const router = useRouter();
  const profile = useUserStore((state) => state.user);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('profile.title')}
          left={
            <CartSvg
              height={moderateScale(24)}
              color={'black'}
              onPress={() => router.push('/(tabs)/(profile)/setting')}
            />
          }
          right={
            <Pressable
              className={`w-full items-end`}
              onPress={() => router.push('/(tabs)/(profile)/setting')}
            >
              <SettingSvg height={moderateScale(24)} />
            </Pressable>
          }
        />
      }
      Body={
        <View className="flex-1 items-center justify-start pt-4">
          {/* <CircleProgressSvg width={moderateScale(150)} /> */}
          <ProfileHeader
            name={profile?.name ?? 'Guest'}
            levelName={'Beginner'}
            avatar={profile?.avatar}
          />
          <ProfileStatsRow streak={profile?.streak} coin={profile?.coins} />
          {profileMenu.map((item) => {
            return (
              <ProfileMenu key={`profile-menu-list-${item.id}`} isLoading={false} data={item} />
            );
          })}
          <View className="mt-2 w-full">
            <AdBanner />
          </View>
          <Pressable className="my-2 w-full items-center justify-center" onPress={() => {}}>
            <Image source={require('@assets/images/pngs/premium-banner.png')} />
          </Pressable>

          <Text className={`my-2 w-full text-center`}>
            {translate('settings.version')}: {Env.VERSION}
          </Text>
          <View className="h-[25px] w-full">
            <Text></Text>
          </View>
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(ProfileScreen));
