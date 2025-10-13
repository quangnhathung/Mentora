import NotiSvg from '@assets/images/svgs/noti.svg';
import SettingSvg from '@assets/images/svgs/setting.svg';
import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { useUserStore } from '@/entities/user/useUserStore';
import { translate, type TxKeyPath } from '@/shared/lib';
import { Env } from '@/shared/lib/env';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { ProfileHeader } from '@/widgets/profile/ProfileHeader';
import { ProfileMenu } from '@/widgets/profile/ProfileMenu';
import { PremiumBanner } from '@/widgets/profile/ProfilePremiumBanner';
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
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.profile')}</span></p>`,
        icon: 'profile',
      },
      {
        id: 2,
        value: 'performance',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.performance')}</span></p>`,
        icon: 'performance',
      },
      {
        id: 3,
        value: 'help',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.help')}</span></p>`,
        icon: 'help',
      },
    ],
  },
  {
    id: 2,
    screenName: 'Choose your native language',
    title: 'profile.heading.link',
    description: 'Choose your native language',
    choices: [
      {
        id: 1,
        value: 'term',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.term')}</span></p>`,
        icon: 'link',
      },
      {
        id: 2,
        value: 'privacy',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.privacy')}</span></p>`,
        icon: 'link',
      },
      {
        id: 3,
        value: 'rating',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.rating')}</span></p>`,
        icon: 'rating',
      },
    ],
  },
];

const ProfileScreen = () => {
  const [profileMenu, _] = useState(profileMenuMock);
  const { profile } = useUserStore();
  const router = useRouter();

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  if (!profile) return null; // hoặc Skeleton

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
            <NotiSvg
              height={moderateScale(24)}
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
            avatar={profile?.avatar || ''}
            name={profile?.name || 'Guest'}
            levelName={'Beginner'}
            progressPct={profile.progress?.currentLevelProgress!}
          />
          <ProfileStatsRow stats={profile?.stats as any} />
          {profileMenu.map((item) => {
            return (
              <ProfileMenu key={`profile-menu-list-${item.id}`} isLoading={false} data={item} />
            );
          })}
          <PremiumBanner
            onPress={() => {
              router.push('/(tabs)/(premium)/benefit');
            }}
          />
          <Text className={`my-2 w-full text-center`}>
            {translate('settings.version')}: {Env.VERSION}
          </Text>
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(ProfileScreen));
