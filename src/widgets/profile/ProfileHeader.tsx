import { useRef } from 'react';
import { Pressable, View } from 'react-native';

import UserAvatar from '@/entities/user/ui/UserAvatar';
import { LevelModal, type LevelModalRef } from '@/features/profile/ui/LevelModal';
import { Text } from '@/shared/ui';

type Props = {
  avatar: string;
  levelName: string;
  name: string;
  progressPct: number;
};

export const ProfileHeader = ({ avatar, levelName, name, progressPct }: Props) => {
  const levelModalRef = useRef<LevelModalRef>(null);

  const handleSelect = () => {
    levelModalRef.current!.modal!.present();
  };

  return (
    <View className="items-center">
      {/* Progress badge + avatar */}
      <Pressable className="relative" onPress={() => handleSelect()}>
        <UserAvatar
          percent={progressPct}
          image={avatar}
          showPercent
          // className={`size-[--s-circle-progress]`}
        />
      </Pressable>

      <Text className="mt-2 font-baloo text-sm dark:text-primary">{levelName}</Text>
      <Text className="font-baloo text-2xl dark:text-white">{name}</Text>
      <LevelModal ref={levelModalRef} />
    </View>
  );
};
