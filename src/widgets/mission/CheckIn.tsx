import CheckInSvg from '@assets/images/svgs/checkin.svg';
import { vars } from 'nativewind';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { type CheckInDay } from '@/entities/mission/types';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import { DailyBlock } from '@/features/checkin/ui/DailyBlock';
import { EMPTY_ARR } from '@/shared/constants/value';
import { translate, type TxKeyPath } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Pressable, Text, View } from '@/shared/ui';

export const CheckInDaily = memo(() => {
  const { checkIn } = useMissionStore(
    useShallow((state) => ({ checkIn: state.missions?.data?.checkIn }))
  );
  const items = useMemo(() => checkIn ?? EMPTY_ARR<CheckInDay>(), [checkIn]);

  // Dẫn xuất từ server (không lưu state, không cần useEffect)
  const serverDone = useMemo(() => {
    const s = new Set<string>();
    for (const it of items) if (it?.done) s.add(it.key);
    return s;
  }, [items]);

  // Chỉ lưu cục bộ người dùng vừa check
  const [localAdded, setLocalAdded] = useState<Set<string>>(new Set());

  const isChecked = useCallback(
    (id: string) => serverDone.has(id) || localAdded.has(id),
    [serverDone, localAdded]
  );

  const handleCheckIn = useCallback(
    (id: string) => {
      if (serverDone.has(id)) return; // đã done từ server thì bỏ qua
      setLocalAdded((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [serverDone]
  );

  const moderateSize = useMemo(() => vars({ '--w-checkin': `${moderateScale(38)}px` }), []);

  return (
    <View className="mt-2" style={moderateSize}>
      <View className="mb-2 w-full flex-row items-center gap-1">
        <CheckInSvg color={colors.cyan.DEFAULT} />
        <Text className="font-bevietnampro text-base">{translate('mission.checkInReward')}</Text>
      </View>

      <View className="flex-row items-center justify-center gap-2">
        {items.map((item: any) => {
          const checked = isChecked(item.key);
          return (
            <Pressable
              key={item.key}
              onPress={() => handleCheckIn(item.key)}
              disabled={checked}
              className="w-[--w-checkin]"
            >
              <DailyBlock
                className="w-full"
                isCheckIn={checked}
                title={translate(`mission.days.${item.key}` as TxKeyPath)}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});
