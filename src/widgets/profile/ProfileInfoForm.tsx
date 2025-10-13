import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
// import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useForm } from 'react-hook-form';
import {
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  Platform,
  Pressable,
  type StyleProp,
  type TextInputChangeEventData,
  type TextInputProps,
  type TextStyle,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

import { useUserData } from '@/entities/user/model';
import { type UserUpdateProfileRequest } from '@/entities/user/types';
import { useUserStore } from '@/entities/user/useUserStore';
import { queryClient } from '@/shared/api';
import { translate } from '@/shared/lib';
import { ddmmyyyyToDate, isoToDDMMYYYY, strToDdMmYyyy } from '@/shared/lib/helpers/convertDate';
import { colors, ControlledInput, View } from '@/shared/ui';
import { type IconName } from '@/shared/ui/SvgIcon';

type FormValues = { email: string; name: string; dob?: string };
type Field = {
  id: keyof FormValues;
  label: string;
  icon?: IconName;
  placeholder?: string;
  secure?: boolean;
  calendar?: boolean;
  disabled?: boolean;
  editable?: boolean;
  testID?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  keyboardType?: KeyboardTypeOptions;
};

const fields: Field[] = [
  {
    id: 'name',
    label: translate('profile.form.name'),
    testID: 'name',
    placeholder: '',
    icon: 'edit',
  },
  {
    id: 'email',
    label: translate('profile.form.email'),
    testID: 'email',
    autoCapitalize: 'none',
    disabled: true,
    editable: false,
    placeholder: 'abc@school.com',
    keyboardType: 'email-address',
    icon: 'verified',
  },
  {
    id: 'dob',
    label: translate('profile.form.dob'),
    secure: false,
    calendar: true,
    editable: Platform.select({
      web: true,
      ios: false,
      android: false,
    })!,
    testID: 'dob',
    placeholder: 'dd/mm/yyyy',
    autoCapitalize: 'none',
    icon: 'calendar',
  },
];

const DATE_RX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const schema = z.object({
  name: z.string({
    required_error: translate('form.error.required'),
  }),
  dob: z
    .string()
    .refine((v) => {
      if (v === '') return true;
      return (
        Platform.OS === 'web' ? DATE_RX.test(strToDdMmYyyy(v)) : DATE_RX.test(v),
        { message: translate('form.error.date') }
      );
    })
    .optional(),
  email: z
    .string({
      required_error: translate('form.error.required'),
    })
    .email(translate('form.error.email'))
    .readonly(),
});

export type FormType = z.infer<typeof schema>;

export type ProfileInfoFormProps = {
  className?: string;
};

export type ProfileInfoFormRef = {
  submit: () => void;
};

export const ProfileInfoForm = forwardRef<ProfileInfoFormRef, ProfileInfoFormProps>(
  ({ className = '' }, ref) => {
    const { profile: data } = useUserStore();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(data?.dob ?? '');
    const { mutate: doUpdateProfile, isPending } = useUserData.doUpdateProfile();
    const { handleSubmit, control, setValue } = useForm<FormType>({
      defaultValues: {
        name: data?.name ?? '',
        email: data?.email ?? '',
        dob: data?.dob ?? '',
      },
      resolver: zodResolver(schema),
    });
    const router = useRouter();

    useEffect(() => {
      if (date !== '') {
        setValue('dob', date, {
          shouldValidate: true, // chạy validate dob nếu có
          shouldTouch: true, // đánh dấu đã touch
        });
      }
    }, [date, setValue]);

    const onSubmit = (v: FormValues) => {
      const payload: UserUpdateProfileRequest = {
        ...v,
        dob: strToDdMmYyyy(v.dob!), // vẫn trả về string ⇒ OK
      };
      doUpdateProfile(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: useUserData.getUserProfile.getKey(),
          });
          router.back();
        },
        onError: (error) => {
          console.log('error', error);
        },
      });
      console.log('send API', { ...v, dob: strToDdMmYyyy(v.dob!) });
    };

    // expose
    useImperativeHandle(ref, () => ({
      isPending,
      submit: () => handleSubmit(onSubmit)(), // <- gọi hàm thật
    }));

    const renderItem = useCallback(
      ({ item, index }: { item: Field; index: number }) => {
        const isWeb = Platform.OS === 'web';
        const mask: StyleProp<TextStyle> = { WebkitTextSecurity: 'disc' } as any;
        return (
          <View key={index} className={``}>
            <Pressable onPress={() => item.calendar && setOpen(true)}>
              <ControlledInput
                testID={`${item.id}-input`}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  return (
                    // @ts-ignore
                    Platform.OS === 'web' && item.id === 'dob' && setDate((e.target as any).value)
                  );
                }}
                icon={item.icon}
                calendar={item.calendar}
                control={control}
                name={item.id}
                label={item.label}
                disabled={item.disabled}
                editable={item.editable}
                placeholderTextColor={colors.gray.DEFAULT}
                placeholder={item.placeholder || item.label}
                autoCapitalize={item.autoCapitalize!}
                keyboardType={item.keyboardType!}
                style={[isWeb && item.secure && mask]}
                secureTextEntry={item.secure && !isWeb}
              />
            </Pressable>
            {item.calendar && Platform.OS !== 'web' && (
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date === '' ? new Date() : ddmmyyyyToDate(date)}
                maximumDate={new Date()}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(isoToDDMMYYYY(date));
                  setValue('dob', isoToDDMMYYYY(date), {
                    shouldValidate: true, // chạy validate dob nếu có
                    shouldTouch: true, // đánh dấu đã touch
                  });
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            )}
          </View>
        );
      },
      [control, open, date, setValue]
    );

    return (
      <View className={twMerge(`w-full ${className}`)}>
        {fields.map((item: Field, index: number) => {
          return renderItem({ item, index });
        })}
      </View>
    );
  }
);
