import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Redirect, SplashScreen, Tabs, useSegments } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Platform, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePathData } from '@/entities/path/model';
import { useUserData } from '@/entities/user/model';
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
  const { status } = useAuthStore();
  const [isFirstTime] = useIsFirstTime();
  const insets = useSafeAreaInsets();
  const segments = useSegments();
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

  // Stable icon renderer factory (no Date.now keys, avoids remounts)
  const makeIcon = useCallback(
    (name: IconName, size?: number) =>
      ({ color, focused }: { color: string; focused: boolean }) => (
        <TabIcon name={name} size={size} color={color} focused={focused} />
      ),
    []
  );

  // Precompute icon functions once so references stay stable between renders
  const iconHome = useMemo(() => makeIcon('home'), [makeIcon]);
  const iconDiscover = useMemo(() => makeIcon('compass', 25), [makeIcon]);
  const iconGames = useMemo(() => makeIcon('games', 22), [makeIcon]);
  const iconProfile = useMemo(() => makeIcon('profile'), [makeIcon]);

  const TAB_BAR_HEIGHT = Platform.OS === 'web' ? 35 : 48;
  const V_MARGIN = 12; // khoảng cách nổi lên khỏi đáy
  const bottomSpace = Math.max(insets.bottom, V_MARGIN);

  // ["(drawer)", "(tabs)", "(learning)", "[storylineId]", "story", "[storyId]"]
  const hide = (segments as string[]).indexOf('(lesson)') > -1;

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
      } as ViewStyle,
      tabBarInactiveTintColor: colors.gray.DEFAULT,
      tabBarActiveTintColor: colors.secondary.DEFAULT,
      sceneContainerStyle: {
        paddingBottom: hide ? bottomSpace : bottomSpace + TAB_BAR_HEIGHT,
        backgroundColor: colors.background.dark.DEFAULT,
      } as ViewStyle,
      tabBarBackground: () => (
        <View
          className={`flex-1 rounded-t-2xl bg-background-dark-light ${hide ? 'none' : 'flex'}`}
        />
      ),
    }),
    [hide, bottomSpace, TAB_BAR_HEIGHT]
  );

  if (isFirstTime) {
    return <Redirect href="/welcome" />;
  }

  if (status === 'signOut') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View className={`max-w-screen-md flex-1 bg-background-dark`}>
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
          name="(games)"
          options={{
            title: 'Games',
            lazy: false,
            tabBarIcon: iconGames,
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
          name="(exercise)"
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
  );
}
