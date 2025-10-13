import AppleSvg from '@assets/images/svgs/apple.svg';
import GooglePlaySvg from '@assets/images/svgs/google-play.svg';
import MahtutorLogoSvg from '@assets/images/svgs/mahtutor-logo.svg';
import { type Href, Link, useSegments } from 'expo-router';
import { memo, useMemo } from 'react';

import { type TxKeyPath } from '@/shared/lib';
import { colors, Pressable, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

type NavItem = {
  labelTx: TxKeyPath;
  descriptionTx: TxKeyPath;
  href: Href;
  segment: string;
  icon: IconName;
};

const NAV_ITEMS: readonly NavItem[] = [
  {
    labelTx: 'nav.home.label',
    descriptionTx: 'nav.home.description',
    href: '/(tabs)' as Href,
    segment: '/(tabs)',
    icon: 'home',
  },
  {
    labelTx: 'nav.discover.label',
    descriptionTx: 'nav.discover.description',
    href: '/(tabs)/(discover)/discover' as Href,
    segment: '/(tabs)/(discover)',
    icon: 'compass',
  },
  {
    labelTx: 'nav.mission.label',
    descriptionTx: 'nav.mission.description',
    href: '/(tabs)/(mission)/mission' as Href,
    segment: '/(tabs)/(mission)',
    icon: 'achievement',
  },
  {
    labelTx: 'nav.games.label',
    descriptionTx: 'nav.games.description',
    href: '/(tabs)/(games)/games' as Href,
    segment: '/(tabs)/(games)',
    icon: 'games',
  },
  {
    labelTx: 'nav.community.label',
    descriptionTx: 'nav.community.description',
    href: '/(tabs)/(community)/community' as Href,
    segment: '/(tabs)/(community)',
    icon: 'community',
  },
  {
    labelTx: 'nav.profile.label',
    descriptionTx: 'nav.profile.description',
    href: '/(tabs)/(profile)/profile' as Href,
    segment: '/(tabs)/(profile)',
    icon: 'profile',
  },
];

const normalizeSegments = (segments: readonly string[]): string => {
  if (!segments.length) {
    return '/';
  }

  const normalized = [...segments];

  if (normalized[normalized.length - 1] === 'index') {
    normalized.pop();
  }

  if (!normalized.length) {
    return '/';
  }

  return `/${normalized.join('/')}`;
};

const isActiveSegment = (current: string, target: string) => {
  if (target === '/(tabs)') {
    return current === '/' || current === '/(tabs)';
  }

  return current === target || current.startsWith(`${target}/`);
};

export const WebNav = memo(function WebNav() {
  const segments = useSegments();

  const currentSegment = useMemo(() => {
    return normalizeSegments((segments ?? []) as string[]);
  }, [segments]);

  return (
    <View className="w-full">
      <View className={`mb-2 px-4`}>
        <MahtutorLogoSvg className={`size-full`} />
      </View>

      <View className="w-full flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const active = isActiveSegment(currentSegment, item.segment);

          return (
            <Link key={item.segment} href={item.href} asChild>
              <Pressable
                className={`flex-row items-center justify-between rounded-2xl p-2 ${
                  active ? 'bg-background-dark-light' : 'bg-transparent'
                }`}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: active
                        ? 'rgba(255, 170, 0, 0.14)'
                        : 'rgba(84, 88, 121, 0.32)',
                    }}
                  >
                    <SvgIcon
                      name={item.icon}
                      size={20}
                      color={active ? colors.secondary.DEFAULT : colors.gray.DEFAULT}
                    />
                  </View>

                  <View className="flex-1">
                    <Text
                      className={`text-base font-semibold ${active ? 'text-secondary' : ''}`}
                      tx={item.labelTx}
                    />
                  </View>
                </View>
              </Pressable>
            </Link>
          );
        })}
      </View>
      {/* Footer */}
      <View className="mt-4 flex-col gap-2 px-4">
        <a href="https://www.mahtutor.com/" target="_blank" rel="noopener noreferrer" className="">
          <Text className="">Giới thiệu</Text>
        </a>
        <a href="https://www.mahtutor.com/" target="_blank" rel="noopener noreferrer" className="">
          <Text className="">Cửa hàng</Text>
        </a>
        <a
          href="https://www.mahtutor.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Text className="">Điều khoản</Text>
        </a>
        <a
          href="https://www.mahtutor.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Text className="">Chính sách bảo mật</Text>
        </a>
      </View>
      <View className="mt-4 flex-col gap-2 px-4">
        <BottomBorder className={`border-custom-5 flex-1 rounded-b-2xl`}>
          <a href="https://www.mahtutor.com/privacy" target="_blank" rel="noopener noreferrer">
            <View className="border-custom-5 w-full flex-row items-center justify-center gap-2 rounded-xl bg-background-dark-light p-2">
              <AppleSvg width={24} />
              <View className="flex-col">
                <Text className="text-xs">Download on the</Text>
                <Text className="">Apple Store</Text>
              </View>
            </View>
          </a>
        </BottomBorder>
        <BottomBorder className={`border-custom-5 flex-1 rounded-b-2xl`}>
          <a href="https://www.mahtutor.com/privacy" target="_blank" rel="noopener noreferrer">
            <View className="border-custom-5 w-full flex-row items-center justify-center gap-2 rounded-xl bg-background-dark-light p-2">
              <GooglePlaySvg width={24} height={24} />
              <View className="flex-col">
                <Text className="text-xs">Available on the</Text>
                <Text className="">Google Play</Text>
              </View>
            </View>
          </a>
        </BottomBorder>
      </View>
      <View className="mt-2 flex-col gap-2 px-4">
        <Text className="text-center text-xs">Copyright © 2025 Mahtutor</Text>
      </View>
    </View>
  );
});
