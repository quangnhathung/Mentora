import { router, useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { Alert } from 'react-native';

import { useUpdateLessonStatus } from '@/entities/topic/hook/useUpdateLessonStatus';
import { mockTopics } from '@/entities/topic/mock';
import { useTopics } from '@/entities/topic/useTopic';
import { useProgressStore } from '@/entities/user/hook/useProgressStore';
import { useUpdateProfile } from '@/entities/user/hook/useUpdateProfile';
import { useUserStore } from '@/entities/user/useUserStore';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Pressable, Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import LessonDetailScreen from '@/widgets/topic/exercise';

const ExerciseScreen = () => {
  useHideTabBar();
  const profile = useUserStore((state) => state.user);
  const updateUserStore = useUserStore((state) => state.updateUser);
  const { mutate: update } = useUpdateProfile();
  const progress = useProgressStore((s) => s.progress[profile?.id!]);
  const { setProgress } = useProgressStore();
  const { mutate: updateStatus } = useUpdateLessonStatus();

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const { data: topics, isLoading, isError, error, isFetching } = useTopics();

  //console.log('topics:', topics);
  console.log('isLoading:', isLoading, 'isFetching:', isFetching);
  console.log('isError:', isError, 'error:', error);

  const TopicData = topics ?? mockTopics;
  const { eid, tid } = useLocalSearchParams();
  const topic = TopicData.find((t) => t.id === tid);
  const lesson = topic?.lessons.find((l) => l.id === eid);
  if (!lesson) {
    return <Text>Lesson không tồn tại</Text>;
  }

  const onComplete = () => {
    if (lesson.status === 'completed') {
      router.push({
        pathname: '/(tabs)/(discover)/congra',
        params: { topicId: String(topic?.id) },
      });
    } else {
      update(
        {
          userId: profile?.id!,
          data: { coins: profile?.coins! + lesson.reward! },
        },
        {
          onSuccess: (updatedUser) => {
            console.log('on fetch update user: ', updatedUser);
            updateUserStore({
              name: updatedUser.name,
              avatar: updatedUser.avatar,
              dob: updatedUser.dob,
              email: updatedUser.email,
              streak: updatedUser.streak,
              coins: updatedUser.coins,
            });

            let Crprogress = progress.lesson + 1;

            if (Crprogress === 3) {
              update(
                {
                  userId: profile?.id!,
                  data: { coins: profile?.coins! + 5 },
                },
                {
                  onSuccess: (updatedUser1) => {
                    console.log('update coin for lesson misson +5 ');
                    updateUserStore({
                      name: updatedUser1.name,
                      avatar: updatedUser1.avatar,
                      dob: updatedUser1.dob,
                      email: updatedUser1.email,
                      streak: updatedUser1.streak,
                      coins: updatedUser1.coins,
                    });
                  },
                  onError: (err: any) => {
                    Alert.alert('Update failed', err.response?.data?.error ?? 'UNKNOWN ERROR');
                  },
                }
              );
            }
            //cap nhat trang thai cho lesson hien tai
            updateStatus(
              { lessonId: lesson.id, data: { status: 'completed' } },
              {
                onSuccess: (lesson) => {
                  console.log('Lesson updated:', lesson.status);
                },
              }
            );
            var value = Crprogress > 3 ? 3 : Crprogress;
            setProgress(String(profile?.id), { lesson: value });
            router.push({
              pathname: '/(tabs)/(discover)/congra',
              params: { topicId: String(topic?.id) },
            });
          },
          onError: (err: any) => {
            Alert.alert('Update failed', err.response?.data?.error ?? 'UNKNOWN ERROR');
            router.replace('/(tabs)/(discover)/discover');
          },
        }
      );
    }
  };

  console.log(lesson);

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={false}
      style={moderateSize}
      Header={
        <View className="w-full flex-row justify-between px-3 pt-7">
          <Pressable
            className="pt-3"
            onPress={() => {
              router.back();
            }}
          >
            <SvgIcon name="arrowleft" size={24} color="black" />
          </Pressable>
          <Text className="ml-[-20px] text-center font-baloo text-3xl dark:text-navbar-active">
            Lesson
          </Text>
          <View />
        </View>
      }
      Body={<LessonDetailScreen lesson={lesson} onComplete={onComplete} />}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(ExerciseScreen));
