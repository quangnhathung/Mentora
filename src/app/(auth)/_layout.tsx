import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
