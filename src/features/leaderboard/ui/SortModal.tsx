import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';

import { type Period } from '@/entities/leaderboard/types';
import { useLeaderboardStore } from '@/entities/leaderboard/useLeaderboardStore';
import { translate } from '@/shared/lib';
import { useModal } from '@/shared/ui';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { Options } from '@/shared/ui/select';

export type SortModalProps = {
  // className?: string;
};

export type SortModalRef = {
  modal: BottomSheetModal;
};

export const SortModal = forwardRef<SortModalRef, SortModalProps>((_, ref) => {
  const { period, setPeriod } = useLeaderboardStore();
  const modal = useModal();
  const onSelect = useCallback(
    (option: ChoiceBase) => {
      setPeriod(option.value as Period);
      setTimeout(() => {
        modal.dismiss();
      }, 500);
    },
    [setPeriod, modal]
  );

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
  }));

  const langs: ChoiceBase[] = useMemo<ChoiceBase[]>(
    () => [
      {
        id: 1,
        value: 'monthly',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('sorted.monthly')}</span></p>`,
        // icon: 'reset',
      },
      {
        id: 2,
        value: 'weekly',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('sorted.weekly')}</span></p>`,
        // icon: 'reset',
      },
      {
        id: 3,
        value: 'all',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('sorted.all')}</span></p>`,
        // icon: 'reset',
      },
    ],
    []
  );

  const selected = useMemo(() => langs.find((lang) => lang.value === period), [period, langs]);

  return <Options ref={modal.ref} options={langs} onSelect={onSelect} value={selected?.id} />;
});
