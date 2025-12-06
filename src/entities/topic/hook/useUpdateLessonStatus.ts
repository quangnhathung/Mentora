import { useMutation } from '@tanstack/react-query';

import { updateLessonStatus, type UpdateLessonStatusReq } from '@/entities/topic/api';

import { type Lesson } from '../type';

export const useUpdateLessonStatus = () => {
  return useMutation<Lesson, unknown, { lessonId: string; data: UpdateLessonStatusReq }>({
    mutationFn: ({ lessonId, data }) => updateLessonStatus(lessonId, data),
  });
};
