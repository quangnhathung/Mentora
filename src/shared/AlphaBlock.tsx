import { LinearGradient } from 'expo-linear-gradient';
import { vars } from 'nativewind';

import { moderateScale } from '@/shared/lib/helpers/scale';

import { Text, View } from './ui';

type props = {
  value?: string;
};

export const AlphaBlock = ({ value }: props) => {
  const moderateSize = vars({
    '--s-7': `${moderateScale(40)}px`, // đổi cho dễ thấy
  });

  const isEmpty = !value;

  return (
    <View
      className="relative size-[--s-7] items-center justify-center rounded-lg border-2 border-white"
      style={moderateSize}
    >
      <Text style={{ lineHeight: moderateScale(42) }} className="font-baloo text-4xl">
        {value}
      </Text>
      {!isEmpty && (
        <View className="absolute inset-0 -z-10 size-full rounded-lg">
          <LinearGradient
            colors={['#594DB7', '#7F6FFE', '#9C8FFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 16,
              width: '100%',
              height: '100%',
              alignSelf: 'center',
            }}
          ></LinearGradient>
        </View>
      )}
    </View>
  );
};
