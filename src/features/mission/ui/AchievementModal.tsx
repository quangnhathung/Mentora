import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import { type Mission } from '@/entities/mission/types';
import { ChallengeItem } from '@/entities/mission/ui/ChallengeItem';
import { useUserStore } from '@/entities/user/useUserStore';
import { colors, Modal, useModal, View } from '@/shared/ui';

export type AchievementModalProps = {
  // className?: string;
};

export type AchievementModalRef = {
  modal: BottomSheetModal;
  setData: (item: Mission) => void;
};

export const AchievementModal = forwardRef<AchievementModalRef, AchievementModalProps>((_, ref) => {
  const [data, setData] = useState<Mission | null>(null);
  const modal = useModal();
  const height = 380;
  const snapPoints = useMemo(() => [height], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { profile } = useUserStore();

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
    setData: (item: Mission) => {
      setData(item);
    },
  }));

  return (
    <Modal
      ref={modal.ref}
      title={profile?.name}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: isDark ? colors.background.dark.light : (colors.white.DEFAULT as string),
      }}
    >
      <View className={`flex-1 px-3 py-2`}>
        <ChallengeItem data={data!} />
      </View>
    </Modal>
  );
});
