import { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { lessonApi } from '@/entities/lesson/api';
import { type LessonDetailResponse } from '@/entities/lesson/types';
import { logger } from '@/shared/api';

export type LessonDetailVariables = { id: number };

export const useLessonData = {
  getLessonSectionById: (lessonId: number) =>
    createQuery<LessonDetailResponse, LessonDetailVariables, AxiosError>({
      queryKey: [`/api-profile/v1/private/lessons/${lessonId}`],
      fetcher: (params) => lessonApi.getLessonSectionById(params),
      use: [logger],
      retry: 1,
      staleTime: 1000 * 60 * 60,
    }),
};
