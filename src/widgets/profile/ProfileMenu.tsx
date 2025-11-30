import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { View } from 'react-native';

import { useUserStore } from '@/entities/user/useUserStore';
import { LanguageModal, type LanguageModalRef } from '@/features/profile-setting/ui/LanguageModal';
import { ThemeModal, type ThemeModalRef } from '@/features/profile-setting/ui/ThemeModal';
import { translate, type TxKeyPath } from '@/shared/lib';
import { type resources } from '@/shared/lib/i18n/resources';
import { type RecursiveKeyOf } from '@/shared/lib/i18n/types';
import { storage } from '@/shared/lib/storage';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { Text } from '@/shared/ui';
import SelectableList, { type ChoiceBase } from '@/shared/ui/List/SelectableList';

type ProfileMenuProps = {
  onSelect?: (platform: string) => void;
  isLoading?: boolean;
  data: { choices: ChoiceBase[]; title: TxKeyPath } & Record<string, unknown>;
};

type DefaultProfileMenu = typeof resources.en.translation.profile.menu;
export type MenuKeyPath = RecursiveKeyOf<DefaultProfileMenu>;

export const ProfileMenu = ({ data, isLoading }: ProfileMenuProps) => {
  const router = useRouter();
  const languageModalRef = useRef<LanguageModalRef>(null);
  const themeModalRef = useRef<ThemeModalRef>(null);

  const handleSelect = (idx: number) => {
    const provider = data.choices[idx].value as MenuKeyPath;
    switch (provider) {
      case 'profile':
        router.push('/(tabs)/(profile)/info');
        break;
      case 'performance':
        router.push('/(tabs)/(profile)/performance');
        break;
      case 'language':
        languageModalRef.current!.modal!.present();
        break;
      case 'theme':
        themeModalRef.current!.modal!.present();
        break;
      case 'help':
        router.push('/(tabs)/(profile)/help');
        break;
      case 'reset':
        storage.clearAll();
        useAuthStore.getState().logout();
        useUserStore.getState().logout();
        break;
      case 'logout':
        useAuthStore.getState().logout();
        useUserStore.getState().logout();
        break;
    }
  };

  return (
    <View className="mt-4 w-full flex-col gap-2">
      <Text className="text-base text-white">{translate(data.title)}</Text>
      <SelectableList
        key={`profile-menu-${data.id}`}
        data={data}
        dark={false}
        selectable={false}
        scrollEnabled={false}
        isLoading={isLoading}
        contentContainerClassName={``}
        itemClassName={`flex-1 justify-center`}
        handleSelect={handleSelect}
      />
      <LanguageModal ref={languageModalRef} />
      <ThemeModal ref={themeModalRef} />
    </View>
  );
};
