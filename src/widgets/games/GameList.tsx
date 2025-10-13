import { router } from 'expo-router';
import { vars } from 'nativewind';
import { useMemo, useRef, useState } from 'react';

import { Games } from '@/entities/games/types/mock';
import { type instructions } from '@/entities/games/types/types';
import { type GameInstructionsModalRef, UnitGameModal } from '@/features/unit/ui/UnitGameModal';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Pressable, Text, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { ItemWithImage } from '@/shared/ui/Item/ItemWithImage';
import { SvgIcon } from '@/shared/ui/SvgIcon';

export const GameList = () => {
  const unitGameModalRef = useRef<GameInstructionsModalRef>(null);
  const [selectedGame, setSelectedGame] = useState<instructions | null>(null);
  const handleSelect = (item: (typeof Games)[number]) => {
    setSelectedGame({ name: item.name, content: item.desc });
    unitGameModalRef.current!.modal!.present();
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-unit-image': `${moderateScale(70)}px`,
      }),
    []
  );
  return (
    <View className="w-full gap-3" style={moderateSize}>
      {Games.map((item) => (
        <ItemWithImage key={item.id} image={item.image} isFail={false}>
          <View className="w-full flex-1 flex-col justify-between">
            <View className="flex-row justify-between">
              <Text className="font-baloo text-2xl dark:text-white">{item.name}</Text>
              <Pressable
                onPress={() => {
                  handleSelect(item);
                }}
              >
                <SvgIcon name="instructions" />
              </Pressable>
            </View>
            <View className="self-start">
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: '/difficulty',
                    params: {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      instructions: item.desc,
                    },
                  });
                }}
                className="self-start"
              >
                <GradientView
                  colors={['#FBBC05', '#FFE69E']}
                  containerClassName="overflow-hidden rounded-xl border-2 border-white"
                >
                  <View className="px-4">
                    <Text className="font-baloo text-base dark:text-white">Play</Text>
                  </View>
                </GradientView>
              </Pressable>
            </View>
          </View>
        </ItemWithImage>
      ))}
      <UnitGameModal ref={unitGameModalRef} data={selectedGame ?? { name: '', content: '' }} />
    </View>
  );
};
