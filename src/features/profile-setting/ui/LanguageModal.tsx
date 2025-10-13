import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';

import { useSelectedLanguage } from '@/shared/lib';
import { translate } from '@/shared/lib';
import type { Language } from '@/shared/lib/i18n/resources';
import { useModal } from '@/shared/ui';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { Options } from '@/shared/ui/select';

export type LanguageModalProps = {
  // className?: string;
};

export type LanguageModalRef = {
  modal: BottomSheetModal;
};

export const LanguageModal = forwardRef<LanguageModalRef, LanguageModalProps>((_, ref) => {
  const { language, setLanguage } = useSelectedLanguage();
  const modal = useModal();
  const onSelect = useCallback(
    (option: ChoiceBase) => {
      setLanguage(option.value as Language);
      setTimeout(() => {
        modal.dismiss();
      }, 1000);
    },
    [setLanguage, modal]
  );

  // expose
  useImperativeHandle(ref, () => ({
    modal: modal.ref.current!,
  }));

  const langs: ChoiceBase[] = useMemo<ChoiceBase[]>(
    () => [
      {
        id: 1,
        value: 'en',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('settings.english')}</span></p>`,
        // icon: 'reset',
      },
      {
        id: 2,
        value: 'vi',
        description: `<p class="justify-start"><span class="text-white text-sm">${translate('settings.vietnamese')}</span></p>`,
        // icon: 'reset',
      },
    ],
    []
  );

  const selectedLanguage = useMemo(
    () => langs.find((lang) => lang.value === language),
    [language, langs]
  );

  return (
    <Options
      ref={modal.ref}
      dark
      options={langs}
      onSelect={onSelect}
      value={selectedLanguage?.id}
    />
  );
});
