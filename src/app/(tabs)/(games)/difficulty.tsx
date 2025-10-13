import { useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useRef } from 'react';

import { type GameInfo, type instructions } from '@/entities/games/types/types';
import { type GameInstructionsModalRef } from '@/features/unit/ui/UnitGameModal';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { GameHeader } from '@/widgets/games/GameHeader';
import { ChooseLevel } from '@/widgets/games/Level';

const DifficultyScreen = () => {
  const { id, name, image, instructions } = useLocalSearchParams<{
    id: string;
    name: string;
    image: string;
    instructions: string;
  }>();
  const unitGameModalRef = useRef<GameInstructionsModalRef>(null);
  const ModalData: instructions = useMemo(
    () => ({
      name: name ?? '',
      content: instructions ?? '',
    }),
    [name, instructions]
  );

  const GameInfo: GameInfo = useMemo(
    () => ({
      id: id ?? '',
      name: name ?? '',
      image: image ?? '',
      desc: instructions ?? '',
    }),
    [id, name, image, instructions]
  );

  const moderateSize = useMemo(
    () =>
      vars({
        '--c-125': `${moderateScale(125)}px`,
      }),
    []
  );
  return (
    <ThreeSection
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Header={<GameHeader modalRef={unitGameModalRef} data={ModalData} />}
      Body={<ChooseLevel data={GameInfo} />}
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(DifficultyScreen));
