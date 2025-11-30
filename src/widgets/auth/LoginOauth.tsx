import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native-gesture-handler';

import { LoginOauthFlow } from '@/features/auth/ui/LoginOauthFlow';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image, Text, View } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';

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
        '<p><span class="text-black text-sm text-center">Đăng nhập với Local Account</span></p>',
      iconUrl: '',
    },
  ],
};

const LoginOauth: React.FC = () => {
  const [oauthData] = useState(oauthDataMock);

  const onSelect = (provider: string) => {
    if (provider === 'apple') {
      router.push('/(auth)/local');
    }
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
          <Text className="font-baloo text-2xl">Đăng nhập tài khoản</Text>
        </View>
      }
      Body={
        <View className="flex-1 items-center justify-center">
          <Image
            source={require('@assets/images/pngs/mentora_removebg.png')}
            style={{ height: moderateScale(170), width: moderateScale(145) }}
          />
          <Text
            tx="auth.login.hook"
            className={`py-3 text-center font-bevietnampro-semibold text-base`}
          />
          <LoginOauthFlow request={null} isLoading={false} data={oauthData} onSelect={onSelect} />
        </View>
      }
      Bottom={
        <View className="w-full">
          <Pressable
            onPress={() => {
              router.push('/(auth)/register');
            }}
          >
            <Text className="text-center">
              Don't have account? <Text className="font-bold">Register now!</Text>
            </Text>
          </Pressable>
        </View>
      }
    />
  );
};

export default LoginOauth;
