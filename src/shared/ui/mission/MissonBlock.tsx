import { type Misson } from '@/entities/mission/types';
import { useProgressStore } from '@/entities/user/hook/useProgressStore';
import { useUserStore } from '@/entities/user/useUserStore';
import { Image, ProgressBar, Text, View } from '@/shared/ui';

import { GradientView } from '../GradientView/GradientView';
import { SvgIcon } from '../SvgIcon';

type props = {
  misson: Misson;

  isChanglle?: boolean;
};

export const MissionBlock = ({ misson, isChanglle }: props) => {
  const profile = useUserStore((state) => state.user);
  const userId = profile?.id;

  // Lấy progress hoặc fallback nếu chưa có
  const userProgress =
    useProgressStore((s) => (userId ? s.progress[userId] : undefined)) ?? undefined;

  const color1 = isChanglle ? '#818CF8' : '#F8AAD3';

  const color2 = isChanglle ? '#EC4899' : '#CAB9FC';

  let current = 0;

  switch (misson.title) {
    case 'Daily attendance':
      current = userProgress?.checkin ?? 0;
      break;
    case 'Play 1 game':
      current = userProgress?.game ?? 0;
      break;
    case 'Completed 3 lessons':
      current = userProgress?.lesson ?? 0;
      break;
    case 'Use the app for 30 minutes':
      current = userProgress?.app ?? 0;
      break;
    default:
      current = misson.current;
  }
  const progress = Math.round((current / misson.target) * 100);
  const isCompelted = progress === 100 ? true : false;

  return (
    <GradientView
      colors={[color1, color2]}
      containerClassName="relative w-full rounded-xl"
      start={{ x: 0.5, y: 0 }}
      className="h-[100px]"
      end={{ x: 0.5, y: 1 }}
      pointerEvents="box-none"
    >
      <View style={{ height: 100 }} className="h-[100px] flex-1 flex-row items-center px-2 pt-2">
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: isChanglle
              ? 'https://quangnhathung.github.io/public/mentora/png/Hotmisson.png'
              : 'https://quangnhathung.github.io/public/mentora/png/MissonMockImage.png',
          }}
        />

        <View className="h-full flex-1 flex-col justify-between p-3 py-4 pt-0">
          <View className="w-full">
            <Text className="m-0 p-0 pr-5 font-baloo text-[18px] dark:text-white">
              {misson.title}
            </Text>

            {isCompelted && !isChanglle && (
              <View className="w-[100px] rounded-lg bg-green-500 px-2">
                <Text className="text-[13px] font-bold dark:text-white">Hoàn thành</Text>
              </View>
            )}
          </View>

          <View className="w-full">
            <View className="flex-row justify-between">
              <Text className="text-[14px] font-bold dark:text-white">
                {current}/{misson.target}
              </Text>

              <Text className="text-[14px] font-bold dark:text-white">{progress}%</Text>
            </View>

            <ProgressBar initialProgress={progress} />
          </View>
        </View>
      </View>

      <View className="absolute right-1 top-0 flex-row items-center gap-1">
        <Text className="m-0 pt-1 font-baloo text-lg">+{misson.reward}</Text>

        <SvgIcon name="coin" size={21} />
      </View>
    </GradientView>
  );
};
