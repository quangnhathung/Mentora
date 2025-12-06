import { router } from 'expo-router';
import { Image, Pressable } from 'react-native';

export const PremiumBanner = () => {
  return (
    <Pressable
      className="my-2 w-full items-center justify-center"
      onPress={() => {
        router.push('/(tabs)/(premium)/premium');
      }}
    >
      <Image source={require('@assets/images/pngs/premium-banner.png')} />
    </Pressable>
  );
};
