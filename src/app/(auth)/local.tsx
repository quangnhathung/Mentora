import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { login as apiLogin, type LoginReq } from '@/entities/user/login';
import { useUserStore } from '@/entities/user/useUserStore';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';

export default function LoginScreen() {
  const router = useRouter();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (body: LoginReq) => apiLogin(body),
    onSuccess: (data) => {
      useAuthStore.getState().login({ email: email, provider: 'local' });
      useUserStore.getState().login(data);
      console.log('User: ', data);
      router.push('/(tabs)');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.error || err?.message || 'Đã có lỗi xảy ra';
      Alert.alert('Lỗi', String(message));
    },
  });

  function validate(): string | null {
    if (!email.trim() || !password.trim()) return 'Vui lòng nhập email và mật khẩu.';
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(email)) return 'Email không hợp lệ.';
    return null;
  }

  const onSubmit = () => {
    const v = validate();
    if (v) return Alert.alert('Validation', v);

    const payload: LoginReq = {
      email: email.trim().toLowerCase(),
      password,
    };

    mutation.mutate(payload);
  };

  return (
    <ThreeSection
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <View className="items-center">
          <Text className="mt-[-16px] font-baloo text-3xl">Đăng nhập</Text>
        </View>
      }
      Body={
        <View className="h-full">
          <Text className="mb-1 font-bold">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            className="mb-4 rounded-xl border p-3"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="mb-1 font-bold">Mật khẩu</Text>
          <View className="mb-6 flex-row items-center rounded-xl border px-3 py-1">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Mật khẩu"
              secureTextEntry={!showPassword}
              className="flex-1 py-2"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword((s) => !s)} className="px-2">
              <Text className="text-sm text-primary">{showPassword ? 'Ẩn' : 'Hiện'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      Bottom={
        <View className="w-full px-2 pb-4">
          <TouchableOpacity
            onPress={onSubmit}
            disabled={mutation.isPending}
            className={`items-center rounded-xl py-3 ${mutation.isPending ? 'bg-gray-300' : 'bg-primary'}`}
          >
            {mutation.isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="font-medium text-white">Đăng nhập</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-blue-600">Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
}
