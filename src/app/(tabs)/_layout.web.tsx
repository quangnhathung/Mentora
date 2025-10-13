import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Redirect, SplashScreen, Tabs, useSegments } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useWindowDimensions, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePathData } from '@/entities/path/model';
import { useUserData } from '@/entities/user/model';
import { useIsFirstTime } from '@/shared/lib';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { colors, View } from '@/shared/ui';
import { Underline } from '@/shared/ui/animations/Underline';
import { WiggleIcon } from '@/shared/ui/animations/WiggleIcon';
import { type IconName } from '@/shared/ui/SvgIcon';
import { WebNav } from '@/widgets/home/WebNav';

const RAIL_WIDTH = 280; // chiều rộng mỗi bên
const BREAKPOINT = 1024; // ≥ 1280px mới hiện rails
const TAB_BAR_HEIGHT_WEB = 35; // bạn đang dùng 35 cho web

const TabIcon = React.memo(function TabIcon({
  name,
  size = 24,
  color,
  focused,
}: {
  name: IconName;
  size?: number;
  color: string;
  focused: boolean;
}) {
  return (
    <View className={`items-center justify-center pt-3`}>
      <WiggleIcon name={name} size={size} color={color} focused={focused} />
      <Underline active={focused} />
    </View>
  );
});

export default function TabLayoutWeb() {
  const { width } = useWindowDimensions();
  const showRails = width > BREAKPOINT; // chỉ web + đủ rộng

  const { status } = useAuthStore();
  const [isFirstTime] = useIsFirstTime();
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const bottomSpace = Math.max(insets.bottom, 12);
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useUserData.getUserProfile();
  useUserData.getUserCurrentProgress();
  usePathData.getCurrentPath();

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  // … giữ nguyên logic auth, data fetch, hideSplash, makeIcon, icons …

  const hideTabs: boolean =
    (segments as string[]).indexOf('(lesson)') > -1 ? true : showRails ? true : false;

  // Stable icon renderer factory (no Date.now keys, avoids remounts)
  const makeIcon = useCallback(
    (name: IconName, size?: number) =>
      ({ color, focused }: { color: string; focused: boolean }) => (
        <TabIcon name={name} size={size} color={color} focused={focused} />
      ),
    []
  );

  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      animation: 'shift',
      lazy: true,
      tabBarStyle: {
        display: hideTabs ? 'none' : 'flex',
        position: 'absolute',
        borderTopColor: 'transparent',
        // borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
      } as ViewStyle,
      tabBarInactiveTintColor: colors.gray.DEFAULT,
      tabBarActiveTintColor: colors.secondary.DEFAULT,
      sceneContainerStyle: {
        paddingBottom: hideTabs ? bottomSpace : bottomSpace + TAB_BAR_HEIGHT_WEB,
        backgroundColor: 'transparent',
      } as ViewStyle,
      tabBarBackground: () => (
        <View
          className={`flex-1 rounded-t-2xl bg-background-dark-light ${hideTabs ? 'none' : 'flex'}`}
        />
      ),
    }),
    [hideTabs, bottomSpace]
  );

  // Precompute icon functions once so references stay stable between renders
  const iconHome = useMemo(() => makeIcon('home'), [makeIcon]);
  const iconDiscover = useMemo(() => makeIcon('compass', 25), [makeIcon]);
  const iconMission = useMemo(() => makeIcon('achievement'), [makeIcon]);
  const iconGames = useMemo(() => makeIcon('games', 22), [makeIcon]);
  const iconCommunity = useMemo(() => makeIcon('community'), [makeIcon]);
  const iconProfile = useMemo(() => makeIcon('profile'), [makeIcon]);

  // auth redirects giữ nguyên …

  if (isFirstTime) {
    return <Redirect href="/welcome" />;
  }

  if (status === 'signOut') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View
      className="flex-1 items-center justify-center bg-background-dark"
      style={{
        backgroundImage: `url(https://static.saoladigital.com/public/mtt-mobile-app/images/bg-mobile-white-3.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '30%',
        backgroundPosition: 'top left',
      }}
    >
      {/* Overlay mờ */}
      {/* <View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#ffffff',
          opacity: 0.1,
        }}
      /> */}
      {/* Hàng ngang chỉ trên web */}
      <View className="size-full flex-row items-center justify-center">
        {/* LEFT rail (ẩn nếu không đủ rộng) */}
        {showRails ? (
          <View
            style={{ width: RAIL_WIDTH }}
            className="sticky top-0 hidden h-screen px-4 py-2 lg:flex"
          >
            {/* put anything: nav, ads, shortcuts... */}
            {/* Navbar */}
            <WebNav />
          </View>
        ) : null}

        {/* CENTER content – giới hạn max width, tự co giãn */}
        <View className={`size-full max-w-screen-md`}>
          <Tabs initialRouteName="index" backBehavior="history" screenOptions={screenOptions}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                lazy: false,
                tabBarIcon: iconHome,
              }}
            />

            <Tabs.Screen
              name="(discover)"
              options={{
                title: 'Discover',
                lazy: false,
                tabBarIcon: iconDiscover,
              }}
            />

            <Tabs.Screen
              name="(mission)"
              options={{
                title: 'Mission',
                lazy: false,
                tabBarIcon: iconMission,
              }}
            />

            <Tabs.Screen
              name="(games)"
              options={{
                title: 'Games',
                lazy: false,
                tabBarIcon: iconGames,
              }}
            />

            <Tabs.Screen
              name="(community)"
              options={{
                title: 'Community',
                lazy: false,
                tabBarIcon: iconCommunity,
              }}
            />

            <Tabs.Screen
              name="(profile)"
              options={{
                title: 'Profile',
                lazy: false,
                tabBarIcon: iconProfile,
              }}
            />

            <Tabs.Screen
              name="(lesson)"
              options={{
                href: null,
              }}
            />

            <Tabs.Screen
              name="(exercise)"
              options={{
                href: null,
              }}
            />

            <Tabs.Screen
              name="(unit)"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="style"
              options={{
                href: null,
              }}
            />
          </Tabs>
        </View>

        {/* RIGHT rail */}
        {showRails ? (
          <View
            style={{ width: RAIL_WIDTH }}
            className="sticky top-0 hidden h-screen flex-col gap-4 px-4 py-6 lg:flex"
          >
            {/* secondary widgets */}
            <View className={`h-[300px] w-full rounded-2xl bg-gray`} />
            <View className={`h-[300px] w-full rounded-2xl bg-gray`} />
          </View>
        ) : null}
      </View>
    </View>
  );
}
