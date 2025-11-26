import { Feather } from '@expo/vector-icons'; // Sử dụng icon kính lúp
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

// Định nghĩa lại các type nếu cần (giả định dựa trên code của bạn)
const schema = z.object({
  search: z.string().optional(),
});
type FormType = z.infer<typeof schema>;

type HeaderWithSearchProps = {
  title?: string;
  className?: string;
  onPress?: () => void;
  onQueryChange?: (query: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
};

const HeaderWithSearch = ({
  title,
  className,
  onQueryChange,
  onPress,
  onCancel,
  autoFocus,
}: HeaderWithSearchProps) => {
  const router = useRouter();
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
    <View
      className={twMerge(
        `${Platform.OS === 'ios' ? 'min-h-[150px]' : 'min-h-[120px]'} w-full flex-col border-b px-4 pb-3`,
        className
      )}
    >
      <Text className="mt-7 text-center font-baloo text-2xl dark:text-navbar-active">
        {title || 'Discover'}
      </Text>

      <View className="mt-1 w-full flex-row items-center rounded-xl border p-2">
        <View className="flex-1 flex-row items-center">
          <Feather name="search" size={20} color="#888" className="mr-2" />

          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="flex-1 pb-1 text-base"
                placeholder="tìm kiếm chủ đề"
                placeholderTextColor="#999"
                onFocus={() => setIsFocused(true)}
                onBlur={onBlur}
                onPress={onPress}
                onChangeText={onChange}
                value={value}
                autoFocus={autoFocus}
                returnKeyType="search"
              />
            )}
          />
        </View>

        {isFocused && (
          <TouchableOpacity onPress={handleCancel} className="ml-3">
            <Text className="text-base font-medium dark:text-[#9CA3AF]">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderWithSearch;
