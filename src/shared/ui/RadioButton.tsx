import { vars } from 'nativewind';
import React, { forwardRef, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { type RadioButtonHandle } from '@/shared/ui/animations/RiveAnimation';
import BottomBorder from '@/shared/ui/BottomBorder';
import { Radio } from '@/shared/ui/checkbox';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

export type RadioButtonProp = {
  children: React.ReactNode;
  dark?: boolean;
  selectable?: boolean;
  className?: string | undefined;
  icon?: IconName;
  iconUrl?: string | undefined;
  minSize?: number | undefined;
  selected?: boolean | undefined;
  onChoose?: () => void;
};

const RadioButton = forwardRef<RadioButtonHandle, RadioButtonProp>(
  (
    {
      children,
      className,
      iconUrl,
      dark,
      selectable = true,
      icon,
      minSize = 45,
      selected,
      onChoose,
    }: RadioButtonProp,
    _
    // ref: React.ForwardedRef<RadioButtonHandle>
  ) => {
    const moderateSize = useMemo(
      () =>
        vars({
          '--s-28': `${moderateScale(28)}px`,
          '--s-35': `${moderateScale(35)}px`,
          '--s-radio': `${moderateScale(minSize)}px`,
        }),
      [minSize]
    );

    return (
      <BottomBorder
        rounded="rounded-2xl"
        className={twMerge(`border-custom-5 min-h-[--s-radio] w-full`)}
      >
        <View
          className={twMerge(
            `justify-center rounded-xl ${dark ? 'bg-background-dark' : 'bg-background-dark-light'} ${className}`
          )}
          style={moderateSize}
        >
          <Pressable className={`justify-center`} onPress={onChoose}>
            <View
              className={`h-full flex-row items-center justify-between px-3 py-1.5`}
            >
              <View
                className={`flex-1 flex-row items-center gap-2 align-middle`}
              >
                {/* {flag && <Image source={flag} className="h-auto w-[--s-35]" contentFit="contain" />} */}
                {iconUrl && (
                  <SvgUri
                    className={`h-full`}
                    uri={iconUrl}
                    // height={moderateScale(20)}
                    preserveAspectRatio="xMidYMid meet"
                  />
                )}
                {icon && <SvgIcon className={``} name={icon} />}
                <View className={`${iconUrl ? 'w-4/5' : 'w-full'}`}>
                  {children}
                </View>
              </View>
              <View className={`absolute right-3 ${!selectable && `hidden`}`}>
                <Radio.Icon checked={selected!} />
              </View>
            </View>
          </Pressable>
        </View>
      </BottomBorder>
    );
  }
);

export default RadioButton;
