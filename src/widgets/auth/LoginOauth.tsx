import MahtutorLogoSvg from '@assets/images/svgs/mahtutor-logo.svg';
import PawWithFlagSvg from '@assets/images/svgs/pawwithflag.svg';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { vars } from 'nativewind';
import React, { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import { useUserData } from '@/entities/user/model';
import useAuthData from '@/features/auth/model/useAuthData';
import { LoginOauthFlow } from '@/features/auth/ui/LoginOauthFlow';
import { queryClient } from '@/shared/api';
import { translate } from '@/shared/lib';
import { Env } from '@/shared/lib/env';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { colors, Text, View } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

// Hoàn tất phiên xác thực trên web
WebBrowser.maybeCompleteAuthSession();

type LoginOauthProps = {};

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
        '<p><span class="text-white text-sm text-center">Đăng nhập với Google</span></p>',
      iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/google.svg',
    },
    {
      id: 2,
      value: 'apple',
      description: '<p><span class="text-white text-sm text-center">Đăng nhập với Apple</span></p>',
      iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/apple.svg',
    },
  ],
};

const LoginOauth: React.FC<LoginOauthProps> = () => {
  const [oauthData, setOauthData] = useState(oauthDataMock);
  const { lastLogin, doSignIn, setLastLogin } = useAuthStore();
  const router = useRouter();
  const { mutate: doOauthLoginCallback, isPending: isPendingDoOauthLoginCallback } =
    useAuthData.doOauthLoginCallback();

  // Endpoint tự động khám phá cho Google
  const discovery = useAutoDiscovery('https://accounts.google.com');

  const redirectUri = makeRedirectUri({
    native: `${Env.PACKAGE}:/login`,
    path: 'login',
  });

  useEffect(() => {
    if (!lastLogin.email) return;

    setOauthData((prev) => ({
      ...prev,
      choices: prev.choices.map((choice) =>
        choice.value === lastLogin.provider
          ? {
              ...choice,
              description: `<p><span class="text-secondary font-bevietnampro-semibold text-sm text-center">${lastLogin.email}</span><img src="https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/login.svg" height="22" currentcolor="${colors.secondary.DEFAULT}" /></p>`,
              // description: `<p><span class="text-white text-sm text-center">${lastLogin.email}</span><img src="https://static.saoladigital.com/public/mtt-mobile-app/animations/login-4.riv" animationname="login" height="22" /></p>`,
            }
          : choice
      ),
    }));
  }, [lastLogin]);

  // Cấu hình yêu cầu xác thực
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Platform.select({
        web: Env.OAUTH_GOOGLE_CLIENT_ID_WEB,
        ios: Env.OAUTH_GOOGLE_CLIENT_ID_IOS,
        android: Env.OAUTH_GOOGLE_CLIENT_ID_ANDROID,
      })!,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success' && request?.codeVerifier) {
      const { code } = response.params;
      // Gửi lên BE để exchange lấy access / id token
      doOauthLoginCallback(
        {
          code,
          platform: Platform.OS,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code_verifier: request?.codeVerifier || '',
        },
        {
          onSuccess: (data) => {
            doSignIn({ access: data.accessToken, refresh: data.refreshToken });
            queryClient.invalidateQueries({
              queryKey: useUserData.getUserProfile.getKey(),
            });
            queryClient.invalidateQueries({
              queryKey: useUserData.getUserCurrentProgress.getKey(),
            });
            queryClient.invalidateQueries({
              queryKey: useUserData.getCurrentPathInfo.getKey(),
            });
            router.push('/');
          },
          onError: (error) => {
            console.log('error', error);
          },
        }
      );
    }
  }, [doOauthLoginCallback, redirectUri, request?.codeVerifier, response, router, doSignIn]);

  const onSelect = (provider: string) => {
    if (provider === 'google' && request) {
      setLastLogin({ provider, email: lastLogin.email });
      promptAsync();
    }
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
            request={request}
            isLoading={isPendingDoOauthLoginCallback}
            data={oauthData}
            onSelect={(provider: string) => request && onSelect(provider)}
          />
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default LoginOauth;
