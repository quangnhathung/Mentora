import React, { useRef } from 'react';
import { Platform } from 'react-native';
import GoogleMobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useForeground } from 'react-native-google-mobile-ads';

import { isPremiumActive } from '@/entities/user/hook/useUpdateProfile';
import { useUserStore } from '@/entities/user/useUserStore';

import type { AdBannerProps } from './AdBanner.web';

GoogleMobileAds().initialize();

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.select({
      ios: 'ca-app-pub-3940256099942544/6300978111',
      android: 'ca-app-pub-3940256099942544/6300978111', // test id Android
      default: 'ca-app-pub-3940256099942544/6300978111',
    });

function AdBanner(_props: AdBannerProps) {
  const bannerRef = useRef<BannerAd>(null);

  // Fix for iOS
  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });
  const profile = useUserStore((state) => state.user);
  if (isPremiumActive(profile?.premium)) return <></>;

  return (
    <BannerAd
      ref={bannerRef}
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
    />
  );
}

export default AdBanner;
