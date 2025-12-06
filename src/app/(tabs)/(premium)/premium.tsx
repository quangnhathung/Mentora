import { router } from 'expo-router';
import { useCallback, useState } from 'react'; // Thêm useRef, useCallback
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { Image, Text, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

const { width } = Dimensions.get('window');

// LƯU Ý: Bạn nên thay các link ảnh này bằng link thật hoặc ảnh local
const DATA = [
  {
    id: '1',
    title: 'Ad-free',
    description:
      'Upgrade to Premium and enjoy your learning journey without any interruptions. No ads, just pure focus on what matters most.',
    image: 'https://cdn-icons-png.flaticon.com/512/2916/2916315.png', // Ví dụ link icon ổn định hơn
  },
  {
    id: '2',
    title: 'Study anytime, even offline',
    description:
      'Download video and audio lessons to your phone. Study offline and sync your progress once you’re back online',
    image: 'https://cdn-icons-png.flaticon.com/512/3203/3203874.png',
  },
  {
    id: '3',
    title: 'Access all lessons advanced',
    description:
      'Unlimited access to all lessons from basic to advanced, advanced exercises to test knowledge after each module',
    image: 'https://cdn-icons-png.flaticon.com/512/2436/2436874.png',
  },
  {
    id: '4',
    title: 'Priority customer support',
    description:
      'Receive assistance from experienced agents, prioritized over regular users and available 24/7',
    image: 'https://cdn-icons-png.flaticon.com/512/4087/4087840.png',
  },
];

export default function PremiumScreen() {
  useHideTabBar();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  // 2. Dùng useCallback để tránh tạo lại hàm render mỗi lần render
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View style={{ width: width }} className="items-center justify-center">
        {/* Card */}
        <View
          className="relative mt-10 w-[85%] items-center rounded-3xl bg-white p-6 pt-12 shadow-lg"
          style={{ height: 450 }}
        >
          {/* Logo tròn */}
          <View className="absolute -top-10 z-10 size-32 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
            <Image
              source={{ uri: item.image }}
              className="size-20" // Chỉnh lại size ảnh bên trong cho cân đối
              resizeMode="contain"
            />
          </View>

          {/* Nội dung */}
          <Text className="mb-2 mt-8 text-center font-baloo text-2xl font-bold text-gray-800">
            {item.title}
          </Text>

          <Text className="mb-4 px-2 text-center text-lg leading-6 text-gray-600">
            {item.description}
          </Text>

          {/* Hình minh họa footer */}
          <Image
            source={require('@assets/images/pngs/mera-with-money.png')}
            className="absolute -bottom-4 mb-4 mt-auto h-[200px] w-[170px]"
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }, []);

  return (
    <View className="m-0 flex-1 p-0">
      <GradientView
        colors={['#F8AAD3', '#CAB9FC']}
        containerClassName="h-full w-full rounded-xl"
        className="h-full pt-4"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <TextGradient
          content="Premium"
          colors={['#C68900', '#FFFFFF', '#FFD36B']}
          className="mt-5 text-center font-baloo text-3xl shadow-sm"
        />

        <View className="mt-4 h-[65%]">
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            // Thay onScroll bằng onMomentumScrollEnd
            onMomentumScrollEnd={handleMomentumScrollEnd}
            // Tối ưu hóa hiệu năng FlatList
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={3}
            removeClippedSubviews={true}
          />
        </View>

        {/* --- PAGINATION DOTS --- */}
        <View className="mt-2 h-10 flex-row items-center justify-center gap-2">
          {DATA.map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <View
                key={index}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'h-3 w-8 rounded-full bg-secondary' // Active dài hơn chút
                    : 'size-2.5 rounded-full bg-white/50' // Inactive mờ hơn
                }`}
              />
            );
          })}
        </View>

        {/* --- BUTTON --- */}
        {/* Dùng opacity để giữ layout không bị nhảy khi button xuất hiện/biến mất */}
        <View className="flex-1 justify-end px-6 pb-8">
          <View style={{ opacity: activeIndex === 3 ? 1 : 0 }}>
            <PrimaryButton
              title="Get premium"
              className="w-full shadow-md"
              textStyle="uppercase font-bold"
              disabled={activeIndex !== 3} // Disable khi ẩn để tránh bấm nhầm
              onPress={() => {
                router.push('/(tabs)/(premium)/plan');
              }}
            />
          </View>
        </View>
      </GradientView>
    </View>
  );
}
