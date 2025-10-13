import { Stack } from 'expo-router';

export default function ExerciseLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sumary"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack>
  );
}
