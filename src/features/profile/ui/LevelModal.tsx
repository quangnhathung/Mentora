import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import { forwardRef, useImperativeHandle, useMemo } from 'react';

import { useUserStore } from '@/entities/user/useUserStore';
import { translate } from '@/shared/lib';
import { colors, Modal, Text, useModal, View } from '@/shared/ui';
import { LevelProgress } from '@/widgets/profile/LevelProgress';

export type LevelModalProps = {
  // className?: string;
};

export type LevelModalRef = {
  modal: BottomSheetModal;
};

export const LevelModal = forwardRef<LevelModalRef, LevelModalProps>((_, ref) => {
  const modal = useModal();
  const height = 380;
  const snapPoints = useMemo(() => [height], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { profile } = useUserStore();

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
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
      <View className={`flex-1 flex-col gap-4 px-3`}>
        <LevelProgress progress={profile?.progress!} />
        <View>
          <Text className="pb-2 font-bevietnampro dark:text-white">
            {translate('common.learning_path')}
          </Text>
        </View>
      </View>
    </Modal>
  );
});
