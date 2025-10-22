import { Stack } from 'expo-router';

export default function MissonLayout() {
  return (
    <Stack initialRouteName="mission">
      <Stack.Screen name="mission" options={{ headerShown: false }} />
    </Stack>
  );
}
