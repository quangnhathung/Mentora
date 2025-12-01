import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import { useUpdateProfile } from '@/entities/user/hook/useUpdateProfile';
import { useUserStore } from '@/entities/user/useUserStore';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';

const UpdateProfileScreen = () => {
  const profile = useUserStore((state) => state.user);
  const updateUserStore = useUserStore((state) => state.updateUser);
  const { mutate: update } = useUpdateProfile();

  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [dob, setDob] = useState(profile?.dob || ''); // YYYY-MM-DD
  const [avatar, setAvatar] = useState(profile?.avatar || '');
  useHideTabBar();

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  if (!profile?.id) {
    router.replace('/(auth)/login');
    return null;
  }

  const handleUpdate = () => {
    if (!name.trim() || !email.trim() || !dob.trim() || !avatar.trim()) {
      Alert.alert('Validation', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation', 'Email không hợp lệ.');
      return;
    }

    update(
      {
        userId: profile.id!,
        data: {
          name: name.trim(),
          dob: dob.trim(),
          avatar: avatar.trim(),
        },
      },
      {
        onSuccess: (updatedUser) => {
          // cập nhật store local
          updateUserStore({
            name: updatedUser.name,
            email: updatedUser.email,
            dob: updatedUser.dob,
            avatar: updatedUser.avatar,
          });
          Alert.alert('Success', 'Cập nhật thông tin thành công!');
          router.back();
        },
        onError: (err: any) => {
          const message = err?.response?.data?.error || err?.message || 'Có lỗi xảy ra';
          Alert.alert('Error', message);
        },
      }
    );
  };

  return (
    <ThreeSection
      edges={['top']}
      scrollable
      style={moderateSize}
      Header={
        <View className="items-center">
          <Text className="font-baloo text-2xl dark:text-navbar-active">Update Information</Text>
        </View>
      }
      Body={
        <View className="flex-1 px-2 pt-3">
          <Text className="mb-1 font-bold">Họ và tên</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nguyen Hung"
            className="mb-4 rounded-xl border p-3"
          />

          <Text className="mb-1 font-bold">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            className="mb-4 rounded-xl border p-3"
          />

          <Text className="mb-1 font-bold">Ngày sinh (YYYY-MM-DD)</Text>
          <TextInput
            value={dob}
            onChangeText={setDob}
            placeholder="2000-01-01"
            className="mb-4 rounded-xl border p-3"
          />

          <Text className="mb-1 font-bold">Avatar URL</Text>
          <TextInput
            value={avatar}
            onChangeText={setAvatar}
            placeholder="https://example.com/avatar.jpg"
            autoCapitalize="none"
            className="mb-4 rounded-xl border p-3"
          />
        </View>
      }
      Bottom={
        <View className="px-3 pb-4">
          <SecondaryButton title="Cập nhật" onPress={handleUpdate} />
        </View>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(UpdateProfileScreen));
