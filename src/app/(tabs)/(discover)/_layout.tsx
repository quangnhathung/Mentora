import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack initialRouteName="discover">
      <Stack.Screen
        name="discover"
        options={{
          headerShown: false,
          // animation: 'fade_from_bottom',
          // headerBackVisible: false,
          // headerTitleStyle: tw`text-white`,
          // headerTitleAlign: 'center',
          // headerStyle: tw`flex-1 items-center justify-center rounded-b-2xl bg-primary-dark-light`,
          // headerTitle: () => headerTitle(),
          // headerLeft: () => headerLeft(),
          // headerRight: () => headerRight(),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          // animation: 'fade_from_bottom',
          // headerBackVisible: false,
          // headerTitleStyle: tw`text-white`,
          // headerTitleAlign: 'center',
          // headerStyle: tw`flex-1 items-center justify-center rounded-b-2xl bg-primary-dark-light`,
          // headerTitle: () => headerTitle(),
          // headerLeft: () => headerLeft(),
          // headerRight: () => headerRight(),
        }}
      />
      <Stack.Screen
        name="[tid]"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          // animation: 'fade_from_bottom',
          // headerBackVisible: false,
          // headerTitleStyle: tw`text-white`,
          // headerTitleAlign: 'center',
          // headerStyle: tw`flex-1 items-center justify-center rounded-b-2xl bg-primary-dark-light`,
          // headerTitle: () => headerTitle(),
          // headerLeft: () => headerLeft(),
          // headerRight: () => headerRight(),
        }}
      />
    </Stack>
  );
}
