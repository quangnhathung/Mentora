import { StyleSheet } from 'react-native';

import { ConditionalWrapper } from '@/shared/lib/hocs/ConditionalWrapper';
import { Image, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

import BottomBorder from '../BottomBorder';

type ItemWithImageProps = {
  children?: React.ReactNode;
  isFail?: boolean;
  image?: string;
};

export const ItemWithImage = ({ children, isFail, image }: ItemWithImageProps) => {
  const withCondition = (c: React.ReactNode, condition: boolean) => {
    return condition ? (
      <GradientView
        colors={['primary-dark', 'primary', 'primary-light']}
        containerClassName={`rounded-xl`}
        className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
        pointerEvents="box-none"
      >
        {c}
      </GradientView>
    ) : (
      <View className={`w-full rounded-xl bg-background-gray`}>{c}</View>
    );
  };

  return (
    <BottomBorder className={`border-custom-5-light flex-1 rounded-xl`}>
      <GradientView
        colors={['primary-dark', 'primary', 'primary-light']}
        containerClassName={`rounded-xl`}
        className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
        pointerEvents="box-none"
      >
        <ConditionalWrapper condition={!isFail} wrapper={withCondition}>
          <View className={`w-full flex-row`}>
            <View className={`items-center justify-center overflow-hidden rounded-xl p-4`}>
              <GradientView
                colors={['secondary-dark', 'secondary', 'secondary-light']}
                style={StyleSheet.absoluteFillObject}
                containerClassName={`absolute inset-0`}
                className={`rounded-xl bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light`}
                pointerEvents="box-none"
              />
              <Image source={image} className={`size-[75px] rounded-full`} />
            </View>
            <View className="flex-1 p-3">{children}</View>
          </View>
        </ConditionalWrapper>
      </GradientView>
    </BottomBorder>
  );
};
