// import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { type AuthRequest } from 'expo-auth-session';
import React from 'react';
import { Platform, View } from 'react-native';

import { Text } from '@/shared/ui';
import RiveAnimation from '@/shared/ui/animations/RiveAnimation';
import SelectableList, { type ChoiceBase } from '@/shared/ui/List/SelectableList';

export type LoginOauthFlowProps = {
  request: AuthRequest | null;
  onSelect: (platform: string) => void;
  isLoading?: boolean;
  data: { choices: ChoiceBase[] } & Record<string, unknown>;
};

export const LoginOauthFlow = ({ data, request, isLoading, onSelect }: LoginOauthFlowProps) => {
  const handleSelect = (idx: number) => {
    const provider = data.choices[idx].value as string;
    onSelect(provider);
  };

  return (
    <View className={`flex-1 py-4`}>
      <SelectableList
        key={`${request && 'login-with-prompt'}`}
        data={data}
        selectable={false}
        isLoading={isLoading}
        // contentContainerClassName={`bg-red`}
        itemClassName={`flex-1`}
        handleSelect={handleSelect}
        ListFooterComponent={() => (
          <View className={``}>
            <Text
              txRich={{
                key: 'auth.login.terms',
              }}
              className={`w-full items-baseline py-3 text-center text-sm`}
            />
            {isLoading && (
              <View className={`h-30 w-full items-center justify-center`}>
                <RiveAnimation
                  className={`size-20`}
                  artboardName="Artboard"
                  animationName="hover loop"
                  autoplay
                  source={
                    Platform.OS === 'web'
                      ? `https://static.saoladigital.com/public/mtt-mobile-app/animations/loading-1.riv`
                      : require('@assets/animations/loading.riv')
                  }
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};
