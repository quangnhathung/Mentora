import React, { useEffect, useMemo, useState } from 'react';

import { usePremiumData } from '@/entities/premium/model';
import { Pressable, View } from '@/shared/ui';

import { PlanPackage } from './PlanPackage';

export default function PlanList({ onChange }: { onChange?: (expireTime: number) => void }) {
  const { data } = usePremiumData.getPlan();
  const plans = useMemo(() => data?.data ?? [], [data]);

  const [selectedId, setSelectedId] = useState<number | null>(0);

  useEffect(() => {
    if (plans.length > 0) {
      const outstanding = plans.find((p) => p.outstanding === true);
      if (outstanding?.id !== undefined) {
        setSelectedId(outstanding.id);
      }
    }
  }, [plans]);

  useEffect(() => {
    if (selectedId !== null) {
      const plan = plans.find((p) => p.id === selectedId);
      if (plan && onChange) {
        onChange(plan.value);
      }
    }
  }, [selectedId, onChange, plans]);

  return (
    <View className="gap-4">
      {plans.map((item) => (
        <Pressable key={item.id} onPress={() => setSelectedId(item.id)}>
          <PlanPackage item={item} isChoose={selectedId === item.id} />
        </Pressable>
      ))}
    </View>
  );
}
