import React, { createRef, type RefObject, useEffect, useLayoutEffect, useMemo } from 'react';
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

/** =========================
 *          Kiểu dữ liệu
 *  ========================= */
export type ChoiceBase = {
  id: string | number;
  description: string;
  icon?: IconName;
  iconUrl?: string;
  value?: string;
  [key: string]: unknown;
};

/**
 * Hàm render item mở rộng: ngoài các trường của ListRenderItemInfo,
 * SelectableList sẽ truyền thêm:
 *  - selected: trạng thái được chọn
 *  - onChoose: callback để chọn item (hãy gọi cái này khi người dùng chạm)
 *  - radioRef: ref tới RadioButton để bạn tùy biến nếu cần
 */
export type SelectableItemRender<T extends ChoiceBase> = (
  args: ListRenderItemInfo<T> & {
    selected: boolean;
    onChoose: () => void;
    radioRef: RefObject<RadioButtonHandle>;
  }
) => React.ReactNode;

/**
 * Prop riêng cho SelectableList
 * (gồm data.choices + các tuỳ chọn hiển thị / callback …)
 */
interface SelectableListExtraProps<T extends ChoiceBase> {
  /** Object chứa mảng lựa chọn – giữ nguyên cấu trúc cũ */
  data: { choices: T[] } & Record<string, unknown>;

  /** Tailwind class cho từng item */
  itemClassName?: string;

  /** Bật/tắt hành vi radio checkbox (mặc định: true) */
  checkBox?: boolean;
  dark?: boolean;

  selectable?: boolean;

  /** Trạng thái loading cho EmptyList */
  isLoading?: boolean;

  /** Trạng thái error cho EmptyList (nếu bạn dùng trong EmptyList) */
  isError?: boolean;

  /** Giá trị mục đang được chọn (id) */
  value?: string | number;

  /** Callback khi chọn mục, trả về index đã chọn */
  handleSelect?: (index: number) => void;

  /**
   * Hàm render tùy biến cho nội dung item (children).
   * Hành vi chọn, wrapper RadioButton, ref... vẫn do SelectableList kiểm soát.
   */
  itemRender?: SelectableItemRender<T>;
}

export type SelectableListProps<T extends ChoiceBase> = SelectableListExtraProps<T> &
  Omit<FlatListProps<T>, 'data' | 'renderItem' | 'extraData'>;

/** =========================
 *        Component
 *  ========================= */
function SelectableList<T extends ChoiceBase>({
  /** --- Prop riêng --- */
  data = { choices: [] as T[] },
  checkBox = true,
  dark = false,
  selectable = true,
  isLoading,
  value,
  itemClassName,
  handleSelect,
  itemRender,

  /** --- Các prop còn lại của FlatList --- */
  ...flatListProps
}: SelectableListProps<T>) {
  /** Tính toán index của item đang được chọn dựa vào "value" */
  const valueIndex = useMemo<number>(() => {
    return data.choices?.findIndex((choice) => choice.id === value);
  }, [data.choices, value]);

  /** Tạo refs cho từng RadioButton tương ứng với từng choice */
  const refs = useMemo<RefObject<RadioButtonHandle>[]>(() => {
    return data.choices?.map(() => createRef<RadioButtonHandle>()) ?? [];
  }, [data.choices]);

  /**
   * Đồng bộ UI RadioButton khi "value" thay đổi từ bên ngoài:
   * - Nếu có item được chọn (valueIndex >= 0) => select() item đó
   * - Deselect những item còn lại
   */
  useLayoutEffect(() => {
    if (!checkBox || !Array.isArray(refs) || refs.length === 0) {
      return;
    }

    refs.forEach((ref, index) => {
      if (index === valueIndex) {
        ref.current?.select();
      } else {
        ref.current?.deselect();
      }
    });
  }, [valueIndex, refs, checkBox, data.choices]);

  /**
   * Bảo đảm refs đã được gắn trước khi tương tác (phòng lỗi môi trường)
   * Có thể dùng để log/debug nếu cần.
   */
  useEffect(() => {
    if (!refs.at(0)?.current) {
      // refs chưa sẵn sàng, không làm gì
      return;
    }
  }, [refs]);

  /**
   * Hàm chung để xử lý chọn một item theo index.
   * - Nếu đang selected thì bỏ qua
   * - Nếu checkBox: deselect tất cả, select item hiện tại
   * - Gọi handleSelect (nếu có)
   */
  const handleChoose = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return;
    }

    if (checkBox) {
      refs.forEach((ref, i) => {
        if (i !== index) {
          ref.current?.deselect();
        }
      });
      refs[index]?.current?.select();
    }

    if (typeof handleSelect === 'function') {
      handleSelect(index);
    }
  };

  /**
   * renderItem mặc định:
   * - Bọc nội dung bởi RadioButton (giữ nguyên hành vi)
   * - Nếu có itemRender: dùng itemRender để render children
   * - Nếu không có: hiển thị HtmlText với description mặc định
   */
  const renderItem: ListRenderItem<T> = (info: ListRenderItemInfo<T>) => {
    const { item: choice, index } = info;

    const selected = index === valueIndex;
    const onChoose = () => {
      handleChoose(index, selected);
    };
    const radioRef = refs[index];

    const content =
      typeof itemRender === 'function' ? (
        itemRender({ ...info, selected, onChoose, radioRef })
      ) : (
        <HtmlText html={choice.description} />
      );

    return typeof itemRender === 'function' ? (
      <View className={``}>{content}</View>
    ) : (
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
  };

  /** Trả về FlatList, truyền mọi prop còn lại */
  return (
    <View className="flex-1">
      <FlatList<T>
        data={data.choices}
        extraData={valueIndex}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-[8px]" />}
        ListEmptyComponent={<EmptyList isLoading={Boolean(isLoading)} />}
        keyExtractor={(item) => String(item.id)}
        /** Logic render do SelectableList kiểm soát để giữ hành vi đồng nhất */
        renderItem={renderItem}
        /** Truyền toàn bộ prop còn lại từ người dùng */
        {...flatListProps}
      />
    </View>
  );
}

export default SelectableList;
