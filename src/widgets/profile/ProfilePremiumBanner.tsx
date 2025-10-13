import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

export const PremiumBanner = ({
  onPress = () => {
    router.push('/(tabs)/(premium)/benefit');
  },
}: {
  onPress?: () => void;
}) => (
  <BottomBorder className={`border-custom-5-light mt-2 w-full rounded-2xl`}>
    <GradientView
      colors={['primary-dark', 'primary', 'primary-light']}
      containerClassName={`w-full overflow-hidden rounded-2xl`}
      className={`bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
    >
      <View className={`p-4`}>
        <Text className="font-baloo text-lg text-white">
          Dùng thử <Text className="mt-1 font-baloo text-lg dark:text-secondary">Premium</Text>
        </Text>
        <Text className="py-2 font-baloo text-xl text-white">
          Giảm lên đến <Text className="mt-1 font-baloo text-3xl dark:text-secondary">40%</Text>
        </Text>
        <Pressable onPress={onPress} className="items-center justify-center self-start">
          <GradientView
            colors={['secondary-dark', 'secondary', 'secondary-light']}
            containerClassName={`overflow-hidden rounded-xl border-2 border-white`}
            className={`bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light`}
          >
            <View className={`px-4 py-1`}>
              <Text className="font-baloo text-xl">Mua Ngay</Text>
            </View>
          </GradientView>
        </Pressable>
      </View>
    </GradientView>
  </BottomBorder>
);
