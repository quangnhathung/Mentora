import React, {
  createRef,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import {
  FlatList,
  type FlatListProps,
  type ListRenderItem,
  type ListRenderItemInfo,
} from 'react-native';

import { EmptyList, View } from '@/shared/ui';
import { type RadioButtonHandle } from '@/shared/ui/animations/RiveAnimation';
import HtmlText from '@/shared/ui/HtmlText';
import RadioButton from '@/shared/ui/RadioButton';
import { type IconName } from '@/shared/ui/SvgIcon';

export type ChoiceBase = {
  id: string | number;
  description: string;
  icon?: IconName;
  iconUrl?: string;
  value?: string;
  [key: string]: unknown;
};

export type SelectableItemRender<T extends ChoiceBase> = (
  args: ListRenderItemInfo<T> & {
    selected: boolean;
    onChoose: () => void;
    radioRef: RefObject<RadioButtonHandle | null>;
  }
) => React.ReactNode;

interface SelectableListExtraProps<T extends ChoiceBase> {
  data: { choices: T[] } & Record<string, unknown>;
  itemClassName?: string;
  checkBox?: boolean;
  dark?: boolean;
  selectable?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  value?: string | number;
  handleSelect?: (index: number) => void;
  itemRender?: SelectableItemRender<T>;
}

export type SelectableListProps<T extends ChoiceBase> =
  SelectableListExtraProps<T> &
    Omit<FlatListProps<T>, 'data' | 'renderItem' | 'extraData'>;

function SelectableList<T extends ChoiceBase>({
  data = { choices: [] as T[] },
  checkBox = true,
  dark = false,
  selectable = true,
  isLoading,
  value,
  itemClassName,
  handleSelect,
  itemRender,
  ...flatListProps
}: SelectableListProps<T>): React.ReactElement {
  const valueIndex = useMemo<number>(() => {
    return data.choices?.findIndex((choice) => choice.id === value);
  }, [data.choices, value]);

  // createRef<T>() returns RefObject<T | null> => reflect that in the type
  const refs = useMemo<RefObject<RadioButtonHandle | null>[]>(() => {
    return data.choices?.map(() => createRef<RadioButtonHandle>()) ?? [];
  }, [data.choices]);

  useLayoutEffect(() => {
    if (!checkBox || !Array.isArray(refs) || refs.length === 0) return;

    refs.forEach((ref, index) => {
      if (index === valueIndex) ref.current?.select();
      else ref.current?.deselect();
    });
  }, [valueIndex, refs, checkBox, data.choices]);

  useEffect(() => {
    if (!refs.at(0)?.current) return;
    // reserved for side-effects if needed later
  }, [refs]);

  const handleChoose = useCallback(
    (index: number, isSelected: boolean) => {
      if (isSelected) return;

      if (checkBox) {
        refs.forEach((ref, i) => {
          if (i !== index) ref.current?.deselect();
        });
        refs[index]?.current?.select();
      }

      if (typeof handleSelect === 'function') handleSelect(index);
    },
    [checkBox, refs, handleSelect]
  );

  const renderItem: ListRenderItem<T> = useCallback(
    (info: ListRenderItemInfo<T>) => {
      const { item: choice, index } = info;
      const selected = index === valueIndex;
      const onChoose = () => handleChoose(index, selected);
      const radioRef = refs[index];

      const content =
        typeof itemRender === 'function' ? (
          itemRender({ ...info, selected, onChoose, radioRef })
        ) : (
          <HtmlText html={choice.description} />
        );

      if (typeof itemRender === 'function') {
        return <View>{content}</View>;
      }

      return (
        <RadioButton
          ref={radioRef}
          dark={dark}
          selected={selected}
          selectable={selectable}
          className={itemClassName}
          minSize={45}
          icon={choice.icon}
          iconUrl={choice.iconUrl}
          onChoose={onChoose}
        >
          {content}
        </RadioButton>
      );
    },
    [
      valueIndex,
      refs,
      itemRender,
      handleChoose,
      dark,
      selectable,
      itemClassName,
    ]
  );

  return (
    <View className="flex-1">
      <FlatList<T>
        data={data.choices}
        extraData={valueIndex}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-[8px]" />}
        ListEmptyComponent={<EmptyList isLoading={Boolean(isLoading)} />}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        {...flatListProps}
      />
    </View>
  );
}

export default SelectableList;
