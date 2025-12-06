import { router } from 'expo-router';
import { Image, Pressable } from 'react-native';

import { isPremiumActive } from '@/entities/user/hook/useUpdateProfile';
import { useUserStore } from '@/entities/user/useUserStore';
export const PremiumBanner = () => {
  const profile = useUserStore((state) => state.user);
  if (isPremiumActive(profile?.premium)) return <></>;
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
