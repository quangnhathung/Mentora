import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Alert, View } from 'react-native';

import { Games } from '@/entities/games/types/mock';
import { type instructions } from '@/entities/games/types/types';
import { GameTemplate } from '@/entities/games/ui/GameTemplate';
import { useProgressStore } from '@/entities/user/hook/useProgressStore';
import { useUpdateProfile } from '@/entities/user/hook/useUpdateProfile';
import { useUserStore } from '@/entities/user/useUserStore';
import { type GameInstructionsModalRef } from '@/features/unit/ui/UnitGameModal';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { GameHeader } from '@/widgets/games/GameHeader';

const GamesScreen = () => {
  const { gid, level, name, desc } = useLocalSearchParams();
  const unitGameModalRef = useRef<GameInstructionsModalRef>(null);
  const profile = useUserStore((state) => state.user);
  const { mutate: update } = useUpdateProfile();
  const { setProgress } = useProgressStore();
  const updateUserStore = useUserStore((state) => state.updateUser);

  useEffect(() => {
    if (!profile?.id) return;

    update(
      {
        userId: profile.id,
        data: { coins: profile.coins + 5 },
      },
      {
        onSuccess: (resp) => {
          console.log('on update game mission: ', resp);
          setProgress(String(profile.id), { game: 1 });
          updateUserStore({ coins: resp.coins });
        },
        onError: (err: any) => {
          Alert.alert('Update failed', err.response?.data?.error ?? 'UNKNOWN ERROR');
        },
      }
    );
  }, [profile?.id]); // Chỉ chạy khi profile?.id thay đổi

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
