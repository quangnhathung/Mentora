import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';

import { type CommentSort } from '@/entities/comment/types';
import { useModal } from '@/shared/ui';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { Options } from '@/shared/ui/select';

export type SortCommentsModalProps = {
  value: CommentSort;
  onChange: (value: CommentSort) => void;
};

export type SortCommentsModalRef = {
  modal: BottomSheetModal;
};

export const SortCommentsModal = forwardRef<SortCommentsModalRef, SortCommentsModalProps>(
  ({ value, onChange }, ref) => {
    const modal = useModal();

    const onSelect = useCallback(
      (option: ChoiceBase) => {
        onChange(option.value as CommentSort);
        setTimeout(() => {
          modal.dismiss();
        }, 300);
      },
      [onChange, modal]
    );

    useImperativeHandle(ref, () => ({
      modal: modal.ref.current!,
    }));

    const choices: ChoiceBase[] = useMemo<ChoiceBase[]>(
      () => [
        {
          id: 1,
          value: 'popular',
          description: `<p class="justify-start"><span class="text-white text-sm">Popular</span></p>`,
        },
        {
          id: 2,
          value: 'recent',
          description: `<p class="justify-start"><span class="text-white text-sm">Recent</span></p>`,
        },
      ],
      []
    );

    const selected = useMemo(() => choices.find((c) => c.value === value), [value, choices]);

    return (
      <Options ref={modal.ref} dark options={choices} onSelect={onSelect} value={selected?.id} />
    );
  }
);

export default SortCommentsModal;
