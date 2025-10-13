import React, { memo } from 'react';
import { View } from 'react-native';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image } from '@/shared/ui/image';

type PlayerProps = {
  image: string;
};

const PlayerOverlay = ({ image }: PlayerProps) => {
  return (
    <View className="rounded-2xl">
      <View
        className="w-full items-center justify-center pb-4"
        style={{ height: moderateScale(200) }}
      >
        <Image
          source={{ uri: image }}
          contentFit="cover"
          className="size-full rounded-2xl border border-white"
        />
        <View
          className={`z-9 absolute top-0 size-full items-center justify-center rounded-2xl bg-black/60`}
        />
      </View>
    </View>
  );
};

export default memo(PlayerOverlay);
