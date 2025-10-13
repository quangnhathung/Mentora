import { zodResolver } from '@hookform/resolvers/zod';
// import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  type KeyboardTypeOptions,
  Platform,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
} from 'react-native';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

import { Button, ControlledInput, View } from '@/shared/ui';

type FormValues = { email: string; password: string; name?: string };
type Field = {
  id: keyof FormValues;
  label: string;
  secure?: boolean;
  testID?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  keyboardType?: KeyboardTypeOptions;
};

const fields: Field[] = [
  { id: 'name', label: 'Name', testID: 'name' },
  {
    id: 'email',
    label: 'Email',
    testID: 'email',
    autoCapitalize: 'none',
    keyboardType: 'email-address',
  },
  { id: 'password', label: 'Password', secure: true, testID: 'password', autoCapitalize: 'none' },
];

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  className?: string;
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ className, onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const renderItem = useCallback(
    ({ item, index }: { item: Field; index: number }) => {
      const isWeb = Platform.OS === 'web';
      const mask: StyleProp<TextStyle> = { WebkitTextSecurity: 'disc' } as any;
      return (
        <View key={index} className={`mb-3`}>
          <ControlledInput
            testID={`${item.id}-input`}
            className="mt-2 rounded-md bg-[#222] px-4 py-3 text-white"
            control={control}
            name={item.id}
            label={item.label}
            placeholderTextColor="#8d8d8d"
            placeholder={item.label}
            autoCapitalize={item.autoCapitalize!}
            keyboardType={item.keyboardType!}
            style={[isWeb && item.secure && mask]}
            secureTextEntry={item.secure && !isWeb}
          />
        </View>
      );
    },
    [control]
  );

  // const RenderScrollComponent = forwardRef<ScrollView, ScrollViewProps>((props, ref) => (
  //   <KeyboardAwareScrollView
  //     {...props}
  //     ref={ref} // <- forward the ref FlashList gives us
  //     bottomOffset={16}
  //     extraKeyboardSpace={8}
  //   />
  // ));
  // const Scroll = Platform.OS === 'web' ? undefined : RenderScrollComponent;

  return (
    <View className={twMerge(`w-full ${className}`)}>
      {fields.map((item: Field, index: number) => {
        return renderItem({ item, index });
      })}

      <Button
        className={`rounded-xl bg-primary text-center font-bevietnampro-bold text-white`}
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
      />
      {/* <KeyboardStickyView className="bg-[#34374f] px-5 pb-4">
        <Text
          className="rounded-xl bg-primary py-4 text-center font-bevietnampro-bold text-white"
          onPress={handleSubmit}
        >
          Login
        </Text>
      </KeyboardStickyView> */}
    </View>
  );
};
