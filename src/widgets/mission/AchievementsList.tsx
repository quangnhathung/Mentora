import BadgeSvg from '@assets/images/svgs/badge.svg';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { type ViewToken } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { type AchievementBundle, type Mission } from '@/entities/mission/types';
import { AchievementItem } from '@/entities/mission/ui/AchievementItem';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import { AchievementModal, type AchievementModalRef } from '@/features/mission/ui/AchievementModal';
import { EMPTY_ARR } from '@/shared/constants/value';
import { colors, EmptyData, List, ListSection, Text, View } from '@/shared/ui';
import { Dots } from '@/shared/ui/Dots';

type SectionT = { title: string; data: Mission[] };

export const AchievementsList = React.memo(() => {
  const [active, setActive] = useState(0);
  // chỉ lấy đúng phần cần từ store
  const { achievements } = useMissionStore(
    useShallow((state) => ({ achievements: state.achievements?.data }))
  );
  const groups = useMemo(() => achievements ?? EMPTY_ARR<AchievementBundle>(), [achievements]);

  // map sang SectionList format, giữ tham chiếu ổn định
  const sections: SectionT[] = useMemo(
    () => groups.map((g) => ({ title: g.title, data: g.achievements ?? [] })),
    [groups]
  );

  const toColumns = <T,>(items: T[], perCol = 2) => {
    const cols: T[][] = [];
    for (let i = 0; i < items.length; i += perCol) cols.push(items.slice(i, i + perCol));
    return cols;
  };

  /** Khi ≥ 50 % item xuất hiện, cập nhật chỉ số */
  const viewConfig = useRef({
    itemVisiblePercentThreshold: 80, // thử 25, 15… nếu muốn
    waitForInteraction: false,
  }).current;
  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].index!);
    }
  }).current;

  const achievementModalRef = useRef<AchievementModalRef>(null);

  const handlePress = (item: Mission) => {
    achievementModalRef.current!.modal!.present();
    achievementModalRef.current!.setData(item);
  };

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string; data: Mission[] } }) => {
      const columns = toColumns(section.data, 2); // 2 hàng
      return (
        <View className="mt-4">
          <View className={`flex-row items-center gap-1 px-4`}>
            <BadgeSvg color={colors.cyan.DEFAULT} />
            <Text className="dark:text-white">{section.title}</Text>
          </View>

          <View className={`w-full`}>
            {columns.length ? (
              <List
                horizontal
                data={columns} // mỗi phần tử = 1 cột
                keyExtractor={(_, i) => `achievement-list-col-${i}`}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName={`px-4 pt-2`}
                // contentContainerStyle={{ paddingHorizontal: 16 }}
                // contentContainerClassName="bg-red"
                ItemSeparatorComponent={() => <View className="w-3" />} // khoảng cách giữa các cột
                renderItem={({ item: col }) => (
                  <View className="w-[300px]">
                    <AchievementItem data={col[0]} onPress={handlePress} />
                    {col[1] && (
                      <View className="mt-3">
                        <AchievementItem data={col[1]} onPress={handlePress} />
                      </View>
                    )}
                  </View>
                )}
                onViewableItemsChanged={onViewable}
                viewabilityConfig={viewConfig}
              />
            ) : (
              <EmptyData />
            )}
          </View>
          <AchievementModal ref={achievementModalRef} />
          <Dots count={columns.length} active={active} />
        </View>
      );
    },
    [active, onViewable, viewConfig]
  );

  return (
    <ListSection
      sections={sections} // { title, data: AchItem[] }
      renderItem={() => null}
      keyExtractor={(_, i) => String(i)}
      // contentClassname={`bg-red`}
      contentContainerClassName={`py-2`}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
    />
  );
});
