import { Linking } from 'react-native';

import { View } from '@/shared/ui';
import SelectableList, { type ChoiceBase } from '@/shared/ui/List/SelectableList';

type Props = {
  className?: string;
  data: ChoiceBase[];
};

type ContactValue = 'customer' | 'facebook' | 'tiktok' | 'web';

export const Contact = ({ className, data }: Props) => {
  const handleSelect = async (idx: number) => {
    const provider = data[idx].value as ContactValue;

    switch (provider) {
      case 'customer': {
        const phoneNumber = '0838557433';
        await Linking.openURL(`tel:${phoneNumber}`);
        break;
      }
      case 'web': {
        const url = 'https://saoladigital.com/';
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        }
        break;
      }
      case 'facebook': {
        const url = 'https://www.facebook.com/quangnhathung2005';
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        }
        break;
      }
      case 'tiktok': {
        const url = 'https://www.tiktok.com/vi-VN/';
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        }
        break;
      }
    }
  };

  return (
    <View className={`${className} flex-1`}>
      <SelectableList
        key="contact-menu"
        data={{ choices: data }}
        scrollEnabled={false}
        contentContainerClassName=""
        itemClassName="flex-1 justify-center"
        handleSelect={handleSelect}
      />
    </View>
  );
};
