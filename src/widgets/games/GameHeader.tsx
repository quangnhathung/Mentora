import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { type instructions } from '@/entities/games/types/types';
import { type GameInstructionsModalRef } from '@/features/unit/ui/UnitGameModal';
import { UnitGameModal } from '@/features/unit/ui/UnitGameModal';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Pressable, Text, View } from '@/shared/ui';
import { SvgIcon } from '@/shared/ui/SvgIcon';

type GameHeaderProps = {
  data: instructions;
  modalRef: React.RefObject<GameInstructionsModalRef>;
};

export const GameHeader = ({ data, modalRef }: GameHeaderProps) => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-unit-image': `${moderateScale(70)}px`,
      }),
    []
  );
  const handleSelect = () => {
    modalRef.current?.modal.present();
  };

  return (
    <View style={moderateSize} className="mb-2 w-full flex-row items-center justify-between px-4">
      <Pressable onPress={() => router.replace('/(games)/games')}>
        <SvgIcon name="arrowleft" size={24} color="#6B7280" />
      </Pressable>

      <Text className="py-3 text-center font-baloo text-2xl dark:text-navbar-active">
        {data.name}
      </Text>

      <Pressable onPress={handleSelect}>
        <SvgIcon name="instructions" size={24} color="#6B7280" />
      </Pressable>
      <UnitGameModal ref={modalRef} data={data} />
    </View>
  );
};
