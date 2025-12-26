import { useEffect, useMemo } from 'react';

import { type UserLessonsListResponse } from '../type';
import { useLessonProgressStore } from '../useUserLessonStore';
import { useUserLessons } from './useUpdateLessonStatus';

export const useLessonProgressData = (userId: number) => {
  const { data, isLoading, error } = useUserLessons(userId);

  const setData = useLessonProgressStore((s) => s.setData);
  const setLoading = useLessonProgressStore((s) => s.setLoading);
  const setError = useLessonProgressStore((s) => s.setError);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    const status = (error as any)?.response?.status;
    if (status === 404) {
      // Reset store nhưng KHÔNG setError để tránh show lỗi
      setData([]);
      setError(null);
      return;
    }
    if (error) setError(error);
  }, [error, setError, setData]);

  useEffect(() => {
    if (data && !error) {
      setData(data);
    }
  }, [data, error, setData]);

  const mapByLessonId = useMemo(() => {
    const map: Record<string, UserLessonsListResponse[number]> = {};
    if (data) {
      data.forEach((item) => {
        map[item.lesson.id] = item;
      });
    }
    return map;
  }, [data]);

  return {
    items: data ?? [],
    mapByLessonId,
    isLoading,
    error,
  };
};
