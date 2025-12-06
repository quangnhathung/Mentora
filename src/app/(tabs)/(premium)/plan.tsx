// Sử dụng icon từ expo (hoặc thư viện bạn đang dùng)
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import { useActivatePremium } from '@/entities/user/hook/usePremium';
import { useUserStore } from '@/entities/user/useUserStore';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { Image, ScrollView, Text, TouchableOpacity, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

export type PlanItem = {
  id: string;
  originalPrice: string;
  price: string;
  features: string[];
  image: string; // hoặc: ImageSourcePropType nếu muốn dùng require()
  isVip: boolean;
};

const PLAN_DATA: PlanItem[] = [
  {
    id: '1',
    originalPrice: '85,000 VND',
    price: '65,000 VND/month',
    features: ['One online group class'],
    // Thay thế bằng ảnh thật của bạn. Đây là ảnh placeholder.
    image: require('@assets/images/pngs/premium1.png'),
    isVip: false,
  },
  {
    id: '2',
    originalPrice: '250,000 VND',
    price: '188,000 VND/month',
    features: ['Certificate of course completion'],
    image: require('@assets/images/pngs/premium2.png'),
    isVip: false,
  },
  {
    id: '3',
    originalPrice: '499,000 VND',
    price: '360,000 VND/month',
    features: ['Advanced level test', 'Specialized vocabulary pack'],
    image: require('@assets/images/pngs/premium3.png'),
    isVip: false,
  },
  {
    id: '4',
    originalPrice: '999,000 VND',
    price: '699,000 VND/month',
    features: ['Early access', 'Exclusive VIP badge'],
    image: require('@assets/images/pngs/pemium4.png'),
    isVip: true, // Đánh dấu gói VIP
  },
];

type PlanCardProps = {
  item: PlanItem;
};
const PlanCard = ({ item }: PlanCardProps) => {
  const { originalPrice, price, features, image, isVip } = item;

  const cardBgClass = isVip ? '' : 'bg-background';
  const priceTextClass = isVip ? 'text-amber-900' : 'text-purple-900';
  const checkIconColor = isVip ? '#78350f' : '#8a4fff'; // Màu icon check

  const CardContent = () => (
    <View
      className={`flex-row items-center rounded-3xl p-4 shadow-sm ${cardBgClass} ${!isVip ? 'border border-white/50' : ''}`}
    >
      <View className="w-1/3 items-center justify-center pr-2">
        {/* Hình ảnh placeholder, thay bằng component Image của bạn nếu cần */}
        <Image source={image} style={{ width: 90, height: 90 }} resizeMode="contain" />
      </View>

      <View className="flex-1 pl-2">
        <Text className="text-xs font-medium text-gray-500 line-through">{originalPrice}</Text>
        <Text className={`text-lg font-extrabold ${priceTextClass} mb-3`}>{price}</Text>

        <View className="">
          {features.map((feature, index) => (
            <View key={index} className="flex-row items-center">
              {/* Icon Check */}
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={checkIconColor}
                style={{ marginRight: 8 }}
              />
              {/* Text tính năng */}
              <Text
                className={`flex-1 flex-wrap text-sm font-medium ${isVip ? 'text-amber-900/80' : 'text-gray-700'}`}
              >
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  if (isVip) {
    return (
      <TouchableOpacity activeOpacity={0.9} className="mb-5 shadow-lg">
        <LinearGradient
          colors={['#FFE29F', '#FFA900', '#FFD36B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 24 }}
        >
          <CardContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.9} className="mb-5 shadow-md">
      <CardContent />
    </TouchableOpacity>
  );
};

export default function PremiumPlanScreen() {
  const { mutate: activate } = useActivatePremium();
  const profile = useUserStore((state) => state.user);

  useHideTabBar();
  const onSubmit = () => {
    activate(
      { userId: profile?.id!, days: 30 },
      {
        onSuccess: (premium) => {
          useUserStore.getState().updateUser({ premium });

          console.log('Premium result:', premium);
          Alert.alert('Thành công', 'Kích hoạt premium thành công!');
          router.replace('/(tabs)');
        },

        onError: (err: any) => {
          const message = err?.response?.data?.error || 'Lỗi kích hoạt';
          console.log(message);
          Alert.alert('Lỗi', message);
        },
      }
    );
  };

  return (
    <View className="flex-1">
      <GradientView
        colors={['#F8AAD3', '#CAB9FC']}
        containerClassName="h-full w-full"
        className="h-full pt-4"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="box-none"
      >
        <TextGradient
          content="Premium"
          colors={['#C68900', '#FFFFFF', '#FFD36B']}
          className="mt-5 text-center font-baloo text-3xl tracking-widest drop-shadow-md"
        />
        <Text className="mb-6 text-center text-sm font-medium dark:text-white/80">
          Unlock your full potential
        </Text>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {PLAN_DATA.map((item) => (
            <PlanCard key={item.id} item={item} />
          ))}
        </ScrollView>

        <View className="absolute inset-x-0 bottom-0 bg-transparent p-5">
          <SecondaryButton
            title="Get premium"
            className={`my-1`}
            textStyle={`uppercase`}
            onPress={() => {
              onSubmit();
            }}
          />
        </View>
      </GradientView>
    </View>
  );
}
