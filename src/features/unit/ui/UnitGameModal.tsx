import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme, vars } from 'nativewind';
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type instructions } from '@/entities/games/types/types';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Modal, Text, useModal, View } from '@/shared/ui';

export type UnitGameModalProps = {
  data?: instructions;
};

export type GameInstructionsModalRef = {
  modal: BottomSheetModal;
};

export const UnitGameModal = forwardRef<GameInstructionsModalRef, UnitGameModalProps>(
  ({ data }, ref) => {
    const modal = useModal();
    //const router = useRouter();

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const snapPoints = useMemo(() => ['35%'], []);

    // expose
    useImperativeHandle(ref, () => ({
      modal: modal.ref.current!,
    }));

    const moderateSize = useMemo(
      () =>
        vars({
          '--s-unit-image': `${moderateScale(70)}px`,
        }),
      []
    );

    const insets = useSafeAreaInsets();

    return (
      <Modal
        ref={modal.ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.background.dark.light : (colors.white.DEFAULT as string),
        }}
      >
        <View className={`flex-1 flex-col gap-3 px-5`} style={{ paddingBottom: insets.bottom }}>
          <View className={`gap-2`} style={moderateSize}>
            <View className="items-center justify-center">
              <Text className="font-bevietnampro text-xl font-bold text-white">{data?.name}</Text>
            </View>
            <Text className="font font-bevietnampro text-lg font-bold underline">How to play?</Text>
            <Text className="font-bevietnampro text-base text-white">{data?.content}</Text>
          </View>
        </View>
      </Modal>
    );
  }
);
