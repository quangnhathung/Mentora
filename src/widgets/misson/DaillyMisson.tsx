import { type Misson } from '@/entities/mission/types';
import { Image, Text, View } from '@/shared/ui';
import { MissionBlock } from '@/shared/ui/mission/MissonBlock';

export const MockMisson: Misson[] = [
  { id: '1', title: 'Điểm danh hằng ngày', current: 1, target: 1, reward: 5 },
  { id: '2', title: 'Chơi 1 game', current: 1, target: 1, reward: 5 },
  { id: '3', title: 'Hoàn thành 3 bài học', current: 0, target: 3, reward: 5 },
  { id: '4', title: 'Sử dụng app trong 30 phút', current: 15, target: 30, reward: 5 },
];

const Changlenge: Misson = {
  id: '1',
  title: 'Streak Keeper',
  current: 5,
  target: 30,
  reward: 50,
};

export const Daily = () => {
  return (
    <View className="w-ful py-2">
      <View className="w-full items-center">
        <Text className="font-baloo text-2xl">Daily Mission</Text>
      </View>
      <View className="w-full gap-3">
        {MockMisson.map((item) => (
          <MissionBlock key={item.id} misson={item} />
        ))}
      </View>

      <View className="mt-3 w-full items-center">
        <Text className="font-baloo text-2xl">Daily Mission</Text>
      </View>
      <View className="relative mb-3 w-full">
        <View className="z-10 w-full">
          <MissionBlock key={Changlenge.id} misson={Changlenge} isChanglle />
        </View>
        <View className="absolute top-[85%] z-[-1] w-full flex-row rounded-lg bg-[#DDD6FE] pt-8">
          <Image
            source={require('@assets/images/pngs/MeraWithCup.png')}
            style={{ width: 144, height: 171 }}
          />
          <View className="flex-1 items-center justify-center pr-3">
            <Text>
              Trong tháng 9 này hãy giữ chuỗi 7 ngày điểm danh liên tục để nhận danh hiệu{' '}
              <Text className="dark:text-red">Streak Keeper</Text> và nhận thêm 50 coins
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
