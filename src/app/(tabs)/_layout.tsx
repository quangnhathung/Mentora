import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Redirect, SplashScreen, Tabs, useSegments } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useIsFirstTime } from '@/shared/lib';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { colors, View } from '@/shared/ui';
import { Underline } from '@/shared/ui/animations/Underline';
import { WiggleIcon } from '@/shared/ui/animations/WiggleIcon';
import { type IconName } from '@/shared/ui/SvgIcon';

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

export default function TabLayout() {
  const { isLoggedIn } = useAuthStore();
  const [isFirstTime] = useIsFirstTime();
  const insets = useSafeAreaInsets();
  const segments = useSegments();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    // Splash sẽ ẩn sau khi check xong login
    setTimeout(() => {
      hideSplash();
    }, 800);
  }, [hideSplash]);

  // icon factory
  const makeIcon = useCallback(
    (name: IconName, size?: number) =>
      ({ color, focused }: { color: string; focused: boolean }) => (
        <TabIcon name={name} size={size} color={color} focused={focused} />
      ),
    []
  );

  const iconHome = useMemo(() => makeIcon('home', 28), [makeIcon]);
  const iconDiscover = useMemo(() => makeIcon('search', 28), [makeIcon]);
  const iconGames = useMemo(() => makeIcon('games', 33), [makeIcon]);
  const iconProfile = useMemo(() => makeIcon('profile'), [makeIcon]);
  const iconMission = useMemo(() => makeIcon('routine'), [makeIcon]);

  // style tab bar
  const TAB_BAR_HEIGHT = Platform.OS === 'web' ? 35 : 48;
  const V_MARGIN = 12;
  const bottomSpace = Math.max(insets.bottom, V_MARGIN);

  const hide = (segments as string[]).includes('(lesson)');

  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      animation: 'none',
      lazy: false,
      tabBarStyle: {
        display: hide ? 'none' : 'flex',
        position: 'absolute',
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
      },
      tabBarInactiveTintColor: colors.navbar.element,
      tabBarActiveTintColor: colors.navbar.active,
      sceneContainerStyle: {
        paddingBottom: hide ? bottomSpace : bottomSpace + TAB_BAR_HEIGHT,
        backgroundColor: colors.background.dark.DEFAULT,
      },
      tabBarBackground: () => <View className="flex-1 rounded-t-2xl bg-navbar" />,
    }),
    [hide, bottomSpace, TAB_BAR_HEIGHT]
  );

  // Lần đầu mở app → Welcome
  if (isFirstTime) return <Redirect href="/welcome" />;

  // Chưa login → auth/login
  if (!isLoggedIn) return <Redirect href="/(auth)/login" />;

  return (
    <View className="max-w-screen-md flex-1 bg-navbar">
      <Tabs initialRouteName="index" backBehavior="history" screenOptions={screenOptions}>
        <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: iconHome }} />
        <Tabs.Screen name="(discover)" options={{ title: 'Discover', tabBarIcon: iconDiscover }} />
        <Tabs.Screen name="(mission)" options={{ title: 'Mission', tabBarIcon: iconMission }} />
        <Tabs.Screen name="(games)" options={{ title: 'Games', tabBarIcon: iconGames }} />
        <Tabs.Screen name="(profile)" options={{ title: 'Profile', tabBarIcon: iconProfile }} />

        {/* screen ẩn */}
        <Tabs.Screen name="style" options={{ href: null }} />
        <Tabs.Screen name="(premium)" options={{ href: null }} />
      </Tabs>
    </View>
  );
}
