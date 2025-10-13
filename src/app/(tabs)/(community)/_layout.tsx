import { Stack } from 'expo-router';

export default function CommunityLayout() {
  return (
    <Stack
      initialRouteName="community"
      // screenOptions={
      //   Platform.select({
      //     android: {
      //       statusBarStyle: 'light',
      //       statusBarTranslucent: true,
      //       statusBarBackgroundColor: 'transparent',
      //       statusBarAnimation: 'fade',
      //     },
      //   })
      //   // {
      //   //   statusBarStyle: 'light',
      //   //   statusBarTranslucent: true,
      //   //   statusBarBackgroundColor: 'transparent',
      //   //   statusBarAnimation: 'fade',
      //   // }
      // }
    >
      <Stack.Screen
        name="community"
        options={{
          headerShown: false,
          // ...Platform.select({
          //   android: {
          //     statusBarStyle: 'light',
          //     statusBarTranslucent: true,
          //     statusBarBackgroundColor: 'transparent',
          //     statusBarAnimation: 'fade',
          //   },
          // }),
        }}
      />
      <Stack.Screen
        name="post/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
