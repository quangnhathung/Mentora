import React, { useRef } from 'react';
import { Platform } from 'react-native';
import GoogleMobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useForeground } from 'react-native-google-mobile-ads';

import { useUserStore } from '@/entities/user/useUserStore';

import type { AdBannerProps } from './AdBanner.web';

GoogleMobileAds().initialize();

const adUnitId = __DEV__
  ? TestIds.BANNER // dùng test id có sẵn trong lib
  : Platform.select({
      ios: 'ca-app-pub-3940256099942544/6300978111', // test id iOS
      android: 'ca-app-pub-3940256099942544/6300978111', // test id Android
      default: 'ca-app-pub-3940256099942544/6300978111',
    });

function AdBanner(_props: AdBannerProps) {
  const bannerRef = useRef<BannerAd>(null);
  const profile = useUserStore().profile;
  const isPremium = profile?.premium?.isActive && (profile?.premium?.expiresAt ?? 0) > Date.now();

  // Fix for iOS
  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });

  if (isPremium) {
    return null;
  }

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
