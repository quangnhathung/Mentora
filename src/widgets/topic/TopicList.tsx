import { FlashList } from '@shopify/flash-list';
import { vars } from 'nativewind';
import React, { useMemo, useRef, useState } from 'react';

import { type Topic } from '@/entities/topic/types';
import { type Unit } from '@/entities/unit/types';
import { UnitBase } from '@/entities/unit/ui/UnitList';
import { UnitModal, type UnitModalRef } from '@/features/unit/ui/UnitModal';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';

type TopicListProps = {
  // onSelect?: (platform: string) => void;
  header?: React.ReactNode;
  data?: Topic;
};

export const TopicList = ({ header, data }: TopicListProps) => {
  const [unit, setUnit] = useState<Unit>({});
  const topic = data;

  const unitModalRef = useRef<UnitModalRef>(null);

  const handleSelect = (unit: Unit) => {
    setUnit(unit);
    unitModalRef.current!.modal!.present();
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--w-unit-marker': `${moderateScale(85)}px`,
      }),
    []
  );

  if (!topic) return null;

  return (
    <View key={`topic-${topic?.id}`} className={`w-full px-4`} style={moderateSize}>
      {header}
      <View className={`flex-1`}>
        {/* <TopicPath data={topic?.units} /> */}
        <FlashList
          // key={`topic-list-${topic?.id}`}
          keyExtractor={(item) => `topic-list-${item.id}`}
          data={topic?.units}
          className={``}
          contentContainerClassName={`pt-4`}
          ItemSeparatorComponent={(unit) => {
            const complete = (unit.leadingItem as Unit).lessons?.every(
              (lesson) => lesson.state === 'complete'
            );

            return (
              <View className="h-[12px]">
                <View className={`absolute h-[12px] w-[--w-unit-marker] items-center`}>
                  <View
                    className={`h-full w-1 rounded-full ${complete ? 'bg-secondary' : 'bg-background-gray'}`}
                  />
                </View>
              </View>
            );
          }}
          renderItem={({ item: unit, index }) => (
            <UnitBase.Root key={`unit-grid-${index}`} data={unit} handleSelect={handleSelect}>
              <UnitBase.Image data={unit} />
              <UnitBase.Info data={unit} />
            </UnitBase.Root>
          )}
        />
        <UnitModal data={unit} ref={unitModalRef} />
      </View>
    </View>
  );
};
