import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { useProgressStore } from '@/entities/user/hook/useProgressStore';
import { useUpdateProfile } from '@/entities/user/hook/useUpdateProfile';
import { useUserStore } from '@/entities/user/useUserStore';

export const useAutoAppProgress = () => {
  const profile = useUserStore((state) => state.user);
  const updateProfile = useUserStore((state) => state.updateUser);
  const { setProgress } = useProgressStore();
  const userId = profile?.id;

  const progress = useProgressStore((s) => (userId ? s.progress[userId] : undefined));

  const { mutate: update } = useUpdateProfile();

  // ❗ FIX TYPE: RN timers return number
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!profile?.id) return;

    // Nếu đã đạt 30 thì không cần chạy timer nữa
    if (progress?.app! >= 30) return;

    intervalRef.current = setInterval(
      () => {
        const current = useProgressStore.getState().progress[String(profile.id)]?.app ?? 0;

        if (current >= 30) {
          clearInterval(intervalRef.current!);
          return;
        }

        const newValue = current + 5;

        setProgress(String(profile.id), { app: newValue });

        console.log('APP PROGRESS:', newValue);

        if (newValue >= 30) {
          clearInterval(intervalRef.current!);

          update(
            {
              userId: Number(profile.id),
              data: { coins: profile.coins + 3 },
            },
            {
              onSuccess: (data) => {
                setProgress(String(profile.id), { game: 1 });
                updateProfile({ coins: data.coins });
              },
              onError: (err: any) => {
                Alert.alert('Update failed', err.response?.data?.error ?? 'UNKNOWN ERROR');
              },
            }
          );
        }
      },
      5 * 60 * 1000
    ); // 5 phút

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [profile?.id]);
};
