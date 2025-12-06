import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { Image, Text, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

const { width } = Dimensions.get('window');

// Dữ liệu mẫu
const DATA = [
  {
    id: '1',
    title: 'Ad-free',
    description:
      'Upgrade to Premium and enjoy your learning journey without any interruptions. No ads, just pure focus on what matters most.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTEdkkUgUx9IQKcGgI_i54kiWJ6Wg57s7Hw&s',
  },
  {
    id: '2',
    title: 'Offline Study',
    description:
      'Download video and audio lessons to your phone. Study offline and sync your progress once you’re back online',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wlR8XlQ4obOlXRQL8i7ndXg3QPzpLij2GQ&s',
  },
  {
    id: '3',
    title: 'Advanced Access',
    description:
      'Unlimited access to all lessons from basic to advanced, advanced exercises to test knowledge after each module',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkROzaTvKF7v-wUOUXx9nnJQGELNO-ptLXA&s',
  },
  {
    id: '4',
    title: 'Priority Support',
    description:
      'Receive assistance from experienced agents, prioritized over regular users and available 24/7',
    image: 'https://cdn-icons-png.flaticon.com/512/4087/4087840.png',
  },
];

export default function PremiumScreen() {
  useHideTabBar();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View className="w-screen items-center justify-center">
        {/* Card Trắng Chính */}
        <View className="relative mt-10 h-[450px] w-[85%] items-center rounded-3xl bg-white p-6 pt-12 shadow-lg">
          {/* Logo tròn (Dùng absolute để đẩy lên cạnh trên) */}
          <View className="absolute -top-10 z-10 size-32 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
            <Image
              source={{ uri: item.image }}
              className="z-10 size-32 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
            />
          </View>

          {/* Nội dung Card */}
          <Text className="mb-2 mt-6 text-center font-baloo text-2xl">{item.title}</Text>

          <Text className="mb-4 px-2 text-center text-lg leading-6">{item.description}</Text>

          {/* Hình minh họa - dùng mt-auto để đẩy xuống dưới cùng nếu cần */}
          <Image
            source={require('@assets/images/pngs/mera-with-money.png')}
            className="absolute -bottom-4 mb-4 mt-auto h-[200px] w-[170px]"
          />
        </View>
      </View>
    );
  };
  return (
    <View className="m-0 flex-1 p-0">
      <GradientView
        colors={['#F8AAD3', '#CAB9FC']}
        containerClassName="h-full w-full rounded-xl"
        className="h-full bg-gradient-to-r from-primary-light via-primary to-primary-dark pt-4"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="box-none"
      >
        <TextGradient
          content="Premium"
          colors={['#C68900', '#FFFFFF', '#FFD36B']}
          className="mt-4 text-center font-baloo text-2xl font-bold"
        />
        <View className="mt-10 h-[65%]">
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        </View>

        {/* --- 2. PAGINATION (DẤU CHẤM) --- */}
        <View className="h-10 flex-row items-center justify-center gap-2">
          {DATA.map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <View
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2.5 w-6 bg-secondary' // Active: Màu đậm, dài hơn
                    : 'size-2.5 bg-white' // Inactive: Màu mờ, tròn
                }`}
              />
            );
          })}
        </View>
        {activeIndex === 3 && (
          <View className="flex-1 justify-end px-3 pb-3">
            <PrimaryButton
              title="Get premium"
              className={`my-1`}
              textStyle={`uppercase`}
              onPress={() => {
                router.push('/(tabs)/(premium)/plan');
              }}
            />
          </View>
        )}
      </GradientView>
    </View>
  );
}
