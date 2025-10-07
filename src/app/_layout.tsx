// @@iconify-code-gen
// Import  global CSS file
import '../../global.css';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { focusManager } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState, Platform, StatusBar, View as RNView } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import GoogleMobileAds from 'react-native-google-mobile-ads';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { APIProvider } from '@/shared/api';
import { hydrateAuth } from '@/shared/lib/storage/auth/useAuthStore';
import { View } from '@/shared/ui';

export { ErrorBoundary } from 'expo-router';

if (Platform.OS !== 'web') {
  // GoogleMobileAds().initialize();
}

export const unstable_settings = {
  // keep consistent with Stack initial route
  initialRouteName: '(tabs)',
};

// Cách recommended: dùng setEventListener để kết nối AppState → focusManager
focusManager.setEventListener((handleFocus) => {
  const sub = AppState.addEventListener('change', (state) => {
    // Trên RN, coi "active" là đang focus
    handleFocus(state === 'active');
  });
  return () => sub.remove();
});

hydrateAuth();

// if (__DEV__) {
//   import('../../devtools/ReactotronConfig');
// }

/**
 * Extracted initialization logic into a hook to keep RootLayout short.
 * Handles: viewport meta (web), WebBrowser warmup, font loading, splash screen.
 */
function useAppInitialization() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const content =
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

    let meta = document.querySelector<HTMLMetaElement>('meta[name=viewport]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = content;
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding so we can hide it
        // only after the app has measured layout and fonts are loaded.
        if (Platform.OS !== 'web') {
          // preventAutoHideAsync is no-op on web and may throw, so guard it
          await SplashScreen.preventAutoHideAsync();
        }

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          BeVietnamPro: require('@assets/fonts/BeVietnamPro-Regular.ttf'),
          'BeVietnamPro-Bold': require('@assets/fonts/BeVietnamPro-Bold.ttf'),
          'BeVietnamPro-Medium': require('@assets/fonts/BeVietnamPro-Medium.ttf'),
          'BeVietnamPro-Italic': require('@assets/fonts/BeVietnamPro-Italic.ttf'),
          'BeVietnamPro-SemiBold': require('@assets/fonts/BeVietnamPro-SemiBold.ttf'),
          Baloo: require('@assets/fonts/Baloo2-Bold.ttf'),
          ...FontAwesome.font,
        });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return appIsReady;
}

export default function RootLayout() {
  const appIsReady = useAppInitialization();

  const onLayoutRootView = useCallback(async () => {
    if (!appIsReady) return;
    // Hide the splash screen only on native platforms after root layout.
    if (Platform.OS !== 'web') {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // In case hideAsync throws for some reason, don't crash the app.
        console.warn('Failed to hide splash screen:', e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // While loading (fonts, etc.) show your splash UI. Keep onLayout here so
    // if the view measures before appIsReady it's a no-op; hide happens only
    // when appIsReady is true and layout is measured.
    return (
      <View
        className="flex-1 items-center justify-center bg-white"
        onLayout={onLayoutRootView}
      >
        <View className="size-full flex-1">
          <LottieView
            resizeMode="cover"
            // ref={animationRef}

            source={require('@assets/lotties/lottie-splash-1.json')}
            // source={{
            //   uri: 'https://static.saoladigital.com/public/lm-web-homepage/images/lotties/lottie.json',
            // }}
            style={{ width: '100%', height: '100%' }}
            // className="h-full w-full"
            autoPlay
            loop={false}
          />
          {/* <Image
        className="flex-1"}
        source="https://static.saoladigital.com/public/lm-web-homepage/images/mascot/astro-hi.svg"
        contentFit="cover"
      /> */}
        </View>
      </View>
    );
  }

  // When appIsReady, render the app and attach onLayout to a native view so
  // we hide the splash only after the first layout pass of the real UI.
  return (
    <RNView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootLayoutNav />
    </RNView>
  );
}

function RootLayoutNav() {
  // console.log('RootLayoutNav');
  return (
    <Providers>
      <Stack screenOptions={{}} initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content');
    }, 0);
  }, [pathname]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardProvider>
          <StatusBar barStyle="light-content" />
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
