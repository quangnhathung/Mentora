import { Stack } from 'expo-router';

export default function ExerciseLayout() {
  return (
    <Stack initialRouteName="[unid]">
      <Stack.Screen
        name="[unid]"
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
    </Stack>
  );
}
