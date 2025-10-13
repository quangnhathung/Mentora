import { zodResolver } from '@hookform/resolvers/zod';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { ControlledInput, Text, TouchableOpacity, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import Screen from '@/shared/ui/screen';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

interface HeaderWithSearchProps {
  title: string;
  className?: string;
  onPress?: () => void;
  onQueryChange?: (q: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const schema = z.object({
  search: z.string(),
});

type FormType = z.infer<typeof schema>;

const HeaderWithSearch = ({
  title,
  className,
  onPress,
  onQueryChange,
  onCancel,
  autoFocus,
}: HeaderWithSearchProps) => {
  const { control, watch, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { search: '' },
    mode: 'onChange',
  });

  const searchValue = watch('search') ?? '';
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      onQueryChange?.((searchValue ?? '').trim());
    }, 300);
    return () => clearTimeout(t);
  }, [searchValue, onQueryChange]);

  // Mỗi lần screen chứa HeaderWithSearch được focus → reset lại state
  useFocusEffect(
    useCallback(() => {
      reset({ search: '' });
      setIsFocused(false);
      return () => {};
    }, [reset])
  );

  const handleCancel = () => {
    reset({ search: '' });
    setIsFocused(false);
    Keyboard.dismiss();
    onCancel?.();
    router.back();
  };

  return (
    <BottomBorder
      className={`border-custom-7-light rounded-b-3xl ${Platform.OS === 'ios' ? 'min-h-[174px]' : 'min-h-[130px]'}`}
    >
      <View
        className={twMerge(
          `${Platform.OS === 'ios' ? 'min-h-[174px]' : 'min-h-[130px]'} w-full flex-col justify-end rounded-b-3xl bg-primary`,
          className
        )}
      >
        <Screen edges={['top']} className="flex-1 rounded-3xl bg-primary">
          <View className={`flex-1 px-4`}>
            <View className={`w-full items-center justify-center`}>
              <TextGradient
                className={`from-white via-white to-white pt-1 text-center font-baloo text-xl uppercase`}
                content={title!}
                colors={['white', 'white', 'white']}
                locations={[0, 0.47, 1]}
              />
            </View>
            <View className="flex-1 flex-row items-end">
              <View className="flex-1">
                <ControlledInput
                  name="search"
                  dark
                  placeholder={`Tìm kiếm chủ đề...`}
                  control={control}
                  onPress={onPress}
                  onFocus={() => setIsFocused(true)}
                  //onBlur={() => setIsFocused(false)}
                  autoFocus={autoFocus}
                  testID="body-input"
                />
              </View>

              {isFocused && (
                <View className="items-center justify-center pb-3 pl-3">
                  <TouchableOpacity onPress={handleCancel}>
                    <Text className="dark:text-white">Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Screen>
      </View>
    </BottomBorder>
  );
};

export default HeaderWithSearch;
