import MahtutorLogoSvg from '@assets/images/svgs/mahtutor-logo.svg';
import PawWithFlagSvg from '@assets/images/svgs/pawwithflag.svg';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';

import { LoginOauthFlow } from '@/features/auth/ui/LoginOauthFlow';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { Text, View } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

// ❗ Không còn Google/Apple OAuth
// Chỉ mock 2 lựa chọn
const oauthDataMock = {
  id: 1,
  screenName: 'Choose your native language',
  title: '',
  description: 'Choose your native language',
  choices: [
    {
      id: 1,
      value: 'google',
      description:
        '<p><span class="text-white text-sm text-center">Google Login (disabled)</span></p>',
      iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/google.svg',
    },
    {
      id: 2,
      value: 'apple',
      description:
        '<p><span class="text-white text-sm text-center">Apple Login (disabled)</span></p>',
      iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/apple.svg',
    },
  ],
};

const LoginOauth: React.FC = () => {
  const [oauthData] = useState(oauthDataMock);
  const { lastLogin } = useAuthStore();

  const onSelect = (provider: string) => {
    // ❗ Không còn xử lý OAuth
    console.log(`Login with ${provider} is disabled.`);
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-7': `${moderateScale(7)}px`,
        '--s-20': `${moderateScale(20)}px`,
        '--s-150': `${moderateScale(150)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={['top', 'bottom']}
      className={``}
      style={moderateSize}
      Header={
        <View className={`w-full items-center justify-center py-2`}>
          {!lastLogin.email ? (
            <TextGradient
              className={`from-primary via-white to-primary py-2 text-center font-baloo text-xl uppercase tracking-widest`}
              content={translate('auth.login.title')}
              colors={['primary', 'white', 'primary']}
              locations={[0, 0.47, 1]}
            />
          ) : (
            <MahtutorLogoSvg height={moderateScale(70)} />
          )}
        </View>
      }
      Body={
        <View className="flex-1 items-center justify-center">
          <PawWithFlagSvg width={moderateScale(150)} />
          <Text
            tx="auth.login.hook"
            className={`py-3 text-center font-bevietnampro-semibold text-base`}
          />
          <LoginOauthFlow
            request={null} // ❗ Không còn OAuth request
            isLoading={false}
            data={oauthData}
            onSelect={onSelect}
          />
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default LoginOauth;
