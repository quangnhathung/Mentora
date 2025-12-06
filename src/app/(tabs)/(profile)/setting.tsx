import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

import { useCancelPremium } from '@/entities/user/hook/usePremium';
import { useUserStore } from '@/entities/user/useUserStore';
import { translate, type TxKeyPath } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { colors } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { ProfileMenu } from '@/widgets/profile/ProfileMenu';
import { PremiumBanner } from '@/widgets/profile/ProfilePremiumBanner';

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
    title: 'profile.heading.general',
    description: 'Choose your native language',
    choices: [
      {
        id: 1,
        value: 'language',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.language')}</span></p>`,
        icon: 'language',
      },
      {
        id: 2,
        value: 'theme',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.theme')}</span></p>`,
        icon: 'theme',
      },
    ],
  },
  {
    id: 2,
    screenName: 'Choose your native language',
    title: 'profile.heading.utility',
    description: 'Choose your native language',
    choices: [
      {
        id: 1,
        value: 'reset',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.reset')}</span></p>`,
        icon: 'reset',
      },
      {
        id: 2,
        value: 'logout',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('profile.menu.logout')}</span></p>`,
        icon: 'logout',
      },
    ],
  },
];

const ProfileScreen = () => {
  const [profileMenu, _] = useState(profileMenuMock);
  const { mutate: cancel } = useCancelPremium();
  const profile = useUserStore((state) => state.user);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const onsubmit = () => {
    console.log('PROFILE ID:', profile?.id);
    cancel(
      { userId: profile?.id! },
      {
        onSuccess: () => {
          useUserStore.getState().updateUser({ premium: null });
          Alert.alert('Thành công', 'Đã hủy Premium!');
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.error || 'Lỗi hủy premium';
          Alert.alert('Lỗi', msg);
          console.log(msg);
        },
      }
    );
  };

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('profile.menu.setting')}
          left={
            <BackButton
              size={`--h-20`}
              iconSize={20}
              color={colors.white.DEFAULT}
              className={`absolute left-0 w-12`}
              onPress={() => router.back()}
            />
          }
          // right={}
        />
      }
      Body={
        <View className="flex-1 items-center justify-start">
          {profileMenu.map((item) => {
            return (
              <ProfileMenu key={`profile-menu-list-${item.id}`} isLoading={false} data={item} />
            );
          })}
          <PremiumBanner />
          <PrimaryButton
            title={'cancel premium'}
            className={`border-border-dark my-1 w-full border-2`}
            textStyle={`uppercase`}
            onPress={() => {
              onsubmit();
            }}
          />
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(ProfileScreen));
