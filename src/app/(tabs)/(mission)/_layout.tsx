import { Stack } from 'expo-router';

export default function MissonLayout() {
  return (
    <Stack initialRouteName="mission">
      <Stack.Screen name="mission" options={{ headerShown: false }} />
      <Stack.Screen name="checkin" options={{ headerShown: false }} />
      <Stack.Screen name="exercise" options={{ headerShown: false }} />
      <Stack.Screen name="congra" options={{ headerShown: false }} />
    </Stack>
  );
}
