import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { register as apiRegister, type RegisterReq } from '@/entities/user/register';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';

export default function RegisterScreen() {
  const router = useRouter();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (body: RegisterReq) => apiRegister(body),
    onSuccess: (_data) => {
      router.push('/congra');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.error || err?.message || 'Đã có lỗi xảy ra';
      Alert.alert('Lỗi', String(message));
    },
  });

  function validate(): string | null {
    if (!name.trim() || !email.trim() || !password.trim())
      return 'Vui lòng điền tên, email và mật khẩu.';
    // basic email regex
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(email)) return 'Email không hợp lệ.';
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
    if (dob && !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return 'Ngày sinh phải có dạng YYYY-MM-DD.';
    return null;
  }

  const onSubmit = () => {
    const v = validate();
    if (v) return Alert.alert('Validation', v);

    const payload: RegisterReq = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      dob: dob ? dob : undefined,
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
          <Text className="mt-[-16px] font-baloo text-3xl">Tạo tài khoản</Text>
        </View>
      }
      Body={
        <View className="w-full">
          <Text className="mb-1 pl-1 font-bold">Họ tên</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nguyễn Văn A"
            className="mb-4 rounded-xl border p-3"
            autoCapitalize="words"
          />

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
          <View className="mb-4 flex-row items-center rounded-xl border px-3">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Mật khẩu"
              secureTextEntry={!showPassword}
              className="flex-1 py-3 dark:text-black"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword((s) => !s)} className="px-2">
              <Text className="text-sm text-blue-600">{showPassword ? 'Ẩn' : 'Hiện'}</Text>
            </TouchableOpacity>
          </View>

          <Text className="mb-1 font-bold">Ngày sinh (tùy chọn)</Text>
          <TextInput
            value={dob}
            onChangeText={setDob}
            placeholder="YYYY-MM-DD"
            className="mb-4 rounded-xl border p-3"
          />
        </View>
      }
      Bottom={
        <View className="w-full px-2 pb-5">
          <View className="flex-row justify-center px-3">
            <Text className="text-center dark:text-background-gray">
              By tapping Register, you agree to our Terms of use and Privacy.
            </Text>
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            disabled={mutation.isPending}
            className={`items-center rounded-xl py-4 ${mutation.isPending ? 'bg-background-dark' : 'bg-secondary'}`}
          >
            {mutation.isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="font-medium text-white">Register</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-blue-600">Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
}
