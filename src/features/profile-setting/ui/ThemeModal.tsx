import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';

import { type ColorSchemeType, useSelectedTheme } from '@/shared/lib';
import { translate } from '@/shared/lib';
import { useModal } from '@/shared/ui';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { Options } from '@/shared/ui/select';

export type ThemeModalProps = {
  // className?: string;
};

export type ThemeModalRef = {
  modal: BottomSheetModal;
};

export const ThemeModal = forwardRef<ThemeModalRef, ThemeModalProps>((_, ref) => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const modal = useModal();
  const onSelect = useCallback(
    (option: ChoiceBase) => {
      setSelectedTheme(option.value as ColorSchemeType);
      modal.dismiss();
    },
    [setSelectedTheme, modal]
  );

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
  }));

  const themes: ChoiceBase[] = useMemo<ChoiceBase[]>(
    () => [
      {
        id: 1,
        value: 'dark',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('settings.theme.dark')}</span></p>`,
        // icon: 'reset',
      },
      {
        id: 2,
        value: 'light',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('settings.theme.light')}</span></p>`,
        // icon: 'reset',
      },
      {
        id: 3,
        value: 'system',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('settings.theme.system')}</span></p>`,
        // icon: 'reset',
      },
    ],
    []
  );

  const selectedLanguage = useMemo(
    () => themes.find((theme) => theme.value === selectedTheme),
    [selectedTheme, themes]
  );

  return (
    <Options
      ref={modal.ref}
      dark
      options={themes}
      onSelect={onSelect}
      value={selectedLanguage?.id}
    />
  );
});
