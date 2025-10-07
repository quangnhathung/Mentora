import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Text, View } from '@/shared/ui';

type TextWithBorderProps = {
  text: string;
  // NOTE: tạm set tailwindAttributes trong .prettierrc.js
  borderClassName?: string;
  // NOTE: tạm set tailwindAttributes trong .prettierrc.js
  textClassName?: string;
};

const TextWithBorder = ({
  text,
  borderClassName,
  textClassName,
}: TextWithBorderProps) => {
  return (
    <View
      className={twMerge(
        `flex-row items-center justify-center border px-2 py-1 ${borderClassName}`
      )}
    >
      <Text className={twMerge(`text-sm dark:text-white ${textClassName}`)}>
        {text}
      </Text>
    </View>
  );
};

export default TextWithBorder;
