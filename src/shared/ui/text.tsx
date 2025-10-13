import { type TOptions } from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { I18nManager, Linking, StyleSheet, Text as RNText, type TextStyle } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { translate, type TxKeyPath } from '@/shared/lib';

type RichConfig = {
  key: TxKeyPath; // i18n key
  components?: React.ReactElement[]; // mảng <Text/> dùng làm link
  options?: Record<string, unknown>; // (tùy chọn) params truyền vào i18n
};

export type Props = React.ComponentProps<typeof RNText> & {
  tx?: TxKeyPath;
  txOptions?: TOptions;
  txRich?: Partial<RichConfig> & { defaults?: string };
  className?: string;
};

export const Text = ({
  className = '',
  style,
  tx,
  txOptions,
  txRich,
  children,
  ...rest
}: Props) => {
  const textStyle = React.useMemo(
    () => twMerge('text-sm text-white dark:text-[#1F2937] font-bevietnampro', className),
    [className]
  );

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
        style,
      ]) as TextStyle,
    [style]
  );

  /* -------- helpers -------- */
  /** Component được gắn với thẻ `<Link …>` trong file i18n */
  const TransLink = React.useCallback(
    ({
      children: linkChildren,
      href,
      className,
    }: {
      children?: React.ReactNode;
      href?: string;
      className?: string;
    }) => {
      // ép kiểu về union mà expo-router mong muốn
      const handlePress = () => {
        if (href) {
          Linking.openURL(href ?? '');
        }
      };
      return (
        // <Pressable
        //   className={``}
        //   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        //   onPress={handlePress}
        // >
        <RNText
          onPress={handlePress}
          className={twMerge(`font-bevietnampro-bold text-sm text-white underline`, className)}
        >
          {linkChildren}
        </RNText>
        // </Pressable>
      );
    },
    []
  );

  // ---------- RENDER ----------
  return (
    <RNText style={nStyle} className={textStyle} {...rest}>
      {txRich ? (
        <Trans
          /* @ts-expect-error – Trans has generics that confuse TS */
          i18nKey={txRich.key}
          defaults={txRich.defaults}
          textComponent={RNText}
          components={{ CustomLink: <TransLink /> }}
          {...txRich.options}
        />
      ) : tx ? (
        translate(tx, txOptions)
      ) : (
        children
      )}
    </RNText>
  );
};
