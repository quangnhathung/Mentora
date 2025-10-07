import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import {
  I18nManager,
  Platform,
  StyleSheet,
  TextInput as NTextInput,
  View,
} from 'react-native';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import { translate } from '@/shared/lib';
import BottomBorder from '@/shared/ui/BottomBorder';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

import colors from './colors';
import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'mb-2 outline-none',
    label: 'mb-1 font-bevietnampro text-base text-white outline-none',
    input: `w-full rounded-lg bg-background-dark-light px-2.5 py-3 font-bevietnampro text-base leading-[22px] text-white outline-none`,
  },

  variants: {
    focused: {
      true: {
        input: 'outline-none',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-gray/30',
      },
    },
    dark: {
      true: {
        input: 'bg-background-dark',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
    dark: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  dark?: boolean;
  disabled?: boolean;
  editable?: boolean;
  icon?: IconName;
  calendar?: boolean;
  maxLengthRender?: React.ReactNode;
  error?: string;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
  icon?: IconName;
  calendar?: boolean;
  dark?: boolean;
  maxLengthRender?: React.ReactNode;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    icon,
    maxLengthRender,
    dark,
    disabled,
    editable,
    error,
    testID,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(disabled),
        dark: dark,
      }),
    [error, isFocussed, disabled]
  );

  return (
    <View className={styles.container()}>
      {label && (
        <View className={`flex-row justify-between`}>
          <Text
            testID={testID ? `${testID}-label` : undefined}
            className={styles.label()}
          >
            {label}
          </Text>
          {icon === 'verified' && (
            <Text
              className={
                'bottom-1 self-end text-xs text-secondary dark:text-secondary'
              }
            >
              {translate('profile.form.verified')}
            </Text>
          )}
        </View>
      )}
      <View className={`w-full flex-row items-center justify-between`}>
        <BottomBorder className={`border-custom-5 w-full rounded-xl`}>
          <NTextInput
            testID={testID}
            ref={ref}
            placeholderTextColor={colors.gray.DEFAULT}
            onBlur={onBlur}
            onFocus={onFocus}
            editable={editable}
            {...inputProps}
            className={twMerge(styles.input(), inputProps.className)}
            style={StyleSheet.flatten([
              { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
              { textAlign: I18nManager.isRTL ? 'right' : 'left' },
              inputProps.style,
            ])}
          />
        </BottomBorder>
        {maxLengthRender}
        {icon && (
          <View className={`absolute right-2.5`}>
            <SvgIcon name={icon} size={22} color={colors.white.DEFAULT} />
          </View>
        )}
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="text-sm text-danger-400 dark:text-danger-600"
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, calendar, icon, control, onChangeText, rules, ...inputProps } =
    props;

  const { field, fieldState } = useController({ control, name, rules });
  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(fieldState.error),
        disabled: Boolean(inputProps.disabled),
      }),
    [fieldState.error, inputProps.disabled]
  );

  if (Platform.OS === 'web' && calendar) {
    return (
      <View className={styles.container()}>
        {inputProps.label && (
          <View className={`flex-row justify-between`}>
            <Text
              testID={
                inputProps.testID ? `${inputProps.testID}-label` : undefined
              }
              className={styles.label()}
            >
              {inputProps.label}
            </Text>
          </View>
        )}
        <input
          type="date"
          autoCapitalize="none"
          className={twMerge(
            styles.input(),
            `bg-transparent ${field.value !== '' ? 'text-white' : 'text-gray'} invalid:text-gray dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:filter`
          )}
          // icon={icon}
          onChange={(e) => onChangeText?.(e.target.value)}
          value={(field.value as string) || ''}
          {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          style={{}}
        />
        {fieldState.error && (
          <Text
            testID={
              inputProps.testID ? `${inputProps.testID}-error` : undefined
            }
            className="text-sm text-danger-400 dark:text-danger-600"
          >
            {fieldState.error?.message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <Input
      ref={field.ref}
      // className={twMerge(`${Platform.OS === 'web' ? 'text-base' : 'text-sm'} ${className}`)}
      autoCapitalize="none"
      icon={icon}
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
