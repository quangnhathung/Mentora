import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme, vars } from 'nativewind';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { convertLessonsToChoices, type Lesson } from '@/entities/lesson/types';
import { type Unit } from '@/entities/unit/types';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Image, Modal, Text, useModal, View } from '@/shared/ui';
import SelectableList from '@/shared/ui/List/SelectableList';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

export type UnitModalProps = {
  data?: Unit;
};

export type UnitModalRef = {
  modal: BottomSheetModal;
};

export const UnitModal = forwardRef<UnitModalRef, UnitModalProps>(({ data }, ref) => {
  const [lesson, setLesson] = useState<Lesson>();
  const modal = useModal();
  //const router = useRouter();
  const options = convertLessonsToChoices(data?.lessons || []);

  useEffect(() => {
    const inProgressLesson = data?.lessons?.find((lesson) => lesson.state === 'inprogress');
    setLesson(inProgressLesson);
  }, [data?.lessons]);

  const height = options.length * 70 + 250;
  const snapPoints = useMemo(() => [height], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSelect = (idx: number) => {
    const chosen = data?.lessons![idx];
    setLesson(chosen);
  };

  // const onSelect = useCallback(() => {
  //   if (!lesson || !data) return;

  //   modal.dismiss();
  //   router.push({
  //     pathname: `/(tabs)/(lesson)/[lid]`,
  //     params: { lid: lesson.id!, unitId: data.id }, // query params
  //   });
  // }, [data, lesson, modal, router]);

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
  }));

  const progressString = (unit: Unit): string => {
    const total = unit?.lessons?.length;
    const completed = unit?.lessons?.filter((l) =>
      'isComplete' in l ? l.isComplete : l.state === 'complete'
    ).length;

    return `${completed} / ${total} lesson${total !== 1 ? 's' : ''}`;
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-unit-image': `${moderateScale(70)}px`,
      }),
    []
  );

  const insets = useSafeAreaInsets();

  return (
    <Modal
      ref={modal.ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: isDark ? colors.background.dark.light : (colors.white.DEFAULT as string),
      }}
    >
      <View className={`flex-1 flex-col gap-3 px-3`} style={{ paddingBottom: insets.bottom }}>
        <View className={`flex-row gap-3`} style={moderateSize}>
          <Image
            source={data?.image}
            className={`size-[--s-unit-image] rounded-xl border-2 border-white`}
          />
          <View className={`flex-col`}>
            <Text className={`text-xxs dark:text-white-dark`}>{data?.tags?.join(' - ')}</Text>
            <Text className={``}>{data?.name}</Text>
            <View className="w-full flex-row items-center gap-1 py-1">
              {data?.lessons?.map((item, i) => (
                <View
                  key={`lessons-${i}`}
                  className={`size-2.5 rounded-full ${item.state === 'complete' ? 'bg-secondary' : 'bg-white-dark'}`}
                />
              ))}
              <Text className={`text-xxs dark:text-white-dark`}>{progressString(data!)}</Text>
            </View>
          </View>
        </View>
        <SelectableList
          data={{ choices: options }}
          scrollEnabled
          isLoading={false}
          value={lesson?.id}
          itemClassName={`flex-1 justify-center bg-background-dark`}
          handleSelect={handleSelect}
        />
        <PrimaryButton
          loading={false}
          title={translate('button.learning')}
          className={`border-custom-5 my-2`}
          textStyle={``}
          // onPress={() => onSelect()}
          onPress={() => {}}
        />
      </View>
    </Modal>
  );
});
