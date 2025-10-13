import { Stack } from 'expo-router';

export default function MissionLayout() {
  return (
    <Stack initialRouteName="mission">
      <Stack.Screen
        name="mission"
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
        name="badge"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="leaderboard"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
