import { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'react-native';

import { LevelModal, type LevelModalRef } from '@/features/profile/ui/LevelModal';
import { Text } from '@/shared/ui';

type Props = {
  avatar?: string;
  levelName: string;
  name: string;
};

export const ProfileHeader = ({ avatar, levelName, name }: Props) => {
  const levelModalRef = useRef<LevelModalRef>(null);

  const handleSelect = () => {
    levelModalRef.current!.modal!.present();
  };

  return (
    <View className="items-center">
      {/* Progress badge + avatar */}
      <Pressable className="relative" onPress={() => handleSelect()}>
        <Image
          source={{
            uri: avatar ?? 'https://quangnhathung.github.io/public/mentora/png/olw-ava.png',
          }}
          className="mr-2 size-[125px] rounded-full border border-border"
        />
      </Pressable>

      <Text className="mt-2 font-baloo text-sm dark:text-primary">{levelName}</Text>
      <Text className="font-baloo text-2xl">{name}</Text>
      <LevelModal ref={levelModalRef} />
    </View>
  );
};
