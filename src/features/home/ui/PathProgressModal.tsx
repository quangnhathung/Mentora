import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import { forwardRef, useImperativeHandle, useMemo } from 'react';

import { colors, Modal, Text, useModal, View } from '@/shared/ui';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';
import { HomeModalContent } from '@/widgets/home/modal/content';

export type HomeModalRef = {
  modal: BottomSheetModal;
};

export const HomeHeaderModal = forwardRef<HomeModalRef>((_, ref) => {
  const modal = useModal();
  const height = 750;
  const snapPoints = useMemo(() => [height], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
  }));

  return (
    <Modal
      ref={modal.ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: isDark ? colors.background.dark.light : (colors.white.DEFAULT as string),
      }}
    >
      <View className={`flex-1 flex-col gap-4 px-2`}>
        {/* header */}
        <View className={`-m-2 w-full items-center`}>
          <TextGradient
            className={`from-primary via-white to-primary pt-2 text-center font-baloo text-xl uppercase tracking-widest`}
            content={'Learning Path'}
            colors={['primary', 'white', 'primary']}
            locations={[0, 0.47, 1]}
          />
          <Text className="-m-2 text-[14px]">{'Daily Common English'}</Text>
        </View>

        {/* body */}
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <HomeModalContent modalRef={modal.ref} />
        </BottomSheetScrollView>
      </View>
    </Modal>
  );
});
