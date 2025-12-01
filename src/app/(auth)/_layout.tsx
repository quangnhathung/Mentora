import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="local" />
      <Stack.Screen name="register" />
      <Stack.Screen name="congra" />
    </Stack>
  );
}
