import React, { useEffect, useState } from 'react';

import { Text, View } from '@/shared/ui';

type CountdownMode = 'day' | 'month';

type Props = {
  mode?: CountdownMode; // 'day' | 'month'
  onChange?: (remainingSeconds: number) => void;
};

const Countdown = ({ mode = 'day', onChange }: Props) => {
  const [remaining, setRemaining] = useState<number>(() => getSecondsUntil(getTarget(mode)));

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const tick = () => {
      const seconds = getSecondsUntil(getTarget(mode));
      setRemaining(seconds);
      onChange?.(seconds);

      if (seconds <= 0 && intervalId) {
        clearInterval(intervalId);
      }
    };

    // chạy ngay lần đầu để tránh chờ 1s đầu tiên
    tick();
    intervalId = setInterval(tick, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [mode, onChange]);

  const renderText = (totalSeconds: number) => {
    if (mode === 'day') {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    // mode === 'month'
    // Ceil để phần ngày còn lại được tính là 1 ngày
    const days = Math.max(0, Math.ceil(totalSeconds / 86400));
    return `Còn ${days} ngày`;
  };

  return (
    <View>
      <Text className="font-bevietnampro text-base dark:text-cyan">{renderText(remaining)}</Text>
    </View>
  );
};

/* ---------- Helpers ---------- */

const getTarget = (mode: CountdownMode): Date => {
  return mode === 'day' ? getEndOfDay() : getEndOfMonth();
};

const getSecondsUntil = (target: Date): number => {
  const now = Date.now();
  return Math.max(0, Math.floor((target.getTime() - now) / 1000));
};

const getEndOfDay = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
};

const getEndOfMonth = (): Date => {
  const now = new Date();
  // Ngày 0 của tháng sau = ngày cuối tháng hiện tại
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
};

const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export default Countdown;
