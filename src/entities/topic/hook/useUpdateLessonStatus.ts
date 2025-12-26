import { useMutation, useQuery } from '@tanstack/react-query';

import { getUserLessons, updateLessonStatus, type UpdateLessonStatusReq } from '../api';
import { type LessonStatusResponse, type UserLessonsListResponse } from '../type';

export const useUpdateLessonStatus = () => {
  return useMutation<
    LessonStatusResponse,
    unknown,
    { lessonId: string; data: UpdateLessonStatusReq }
  >({
    mutationFn: ({ lessonId, data }) => updateLessonStatus(lessonId, data),
  });
};

export const useUserLessons = (userId: number) => {
  console.log('userId', userId);
  return useQuery<UserLessonsListResponse>({
    queryKey: ['user-lessons', userId],
    queryFn: () => getUserLessons(userId),
    enabled: !!userId,
  });
};

// const { data, isLoading } = useUserLessons(currentUser.id);

// if (isLoading) return <Loading />;

// return (
//   <View>
//     {data?.map((item) => (
//       <LessonCard
//         key={item.lesson.id}
//         lesson={item.lesson}
//         userStatus={item.userLesson.status}
//       />
//     ))}
//   </View>
// );
