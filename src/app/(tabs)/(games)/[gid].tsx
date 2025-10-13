import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef } from 'react';
import { View } from 'react-native';

import { Games } from '@/entities/games/types/mock';
import { type instructions } from '@/entities/games/types/types';
import { GameTemplate } from '@/entities/games/ui/GameTemplate';
import { type GameInstructionsModalRef } from '@/features/unit/ui/UnitGameModal';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { GameHeader } from '@/widgets/games/GameHeader';

const GamesScreen = () => {
  const { gid, level, name, desc } = useLocalSearchParams();
  const unitGameModalRef = useRef<GameInstructionsModalRef>(null);

  const ModalData: instructions = useMemo(
    () => ({
      name: Array.isArray(name) ? name[0] : (name ?? ''),
      content: Array.isArray(desc) ? desc[0] : (desc ?? ''),
    }),
    [name, desc]
  );
  const GameInfo = Games[Number(gid) - 1];
  console.log(GameInfo);

  return (
    <ThreeSection
      edges={['top']}
      className={``}
      scrollable
      Header={<GameHeader modalRef={unitGameModalRef} data={ModalData} />}
      Body={
        <View className="flex-1 items-center">
          <GameTemplate
            id={Array.isArray(gid) ? gid[0] : (gid ?? '')}
            points={Array.isArray(level) ? level[0] : (level ?? '')}
          />
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(GamesScreen));

//   return (
//     <View>
//       <Text>Game ID: {id}</Text>
//       <Text>Level: {level}</Text>
//     </View>
//   );
// }
