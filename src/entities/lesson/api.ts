import { isAxiosError } from 'axios';

import { lessonDetailChunk } from '@/entities/lesson/lesson-mock';
import { type LessonDetailVariables } from '@/entities/lesson/model';
import { type LessonDetailResponse } from '@/entities/lesson/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

export const lessonApi = {
  getLessonSectionById: async (variables: LessonDetailVariables) => {
    try {
      const { id } = variables;

      const res = await client.get<ApiResponse<LessonDetailResponse>>(
        `/api-profile/v1/private/lessons/${id}`
      );

      let result = res.data;
      result.data = lessonDetailChunk;

      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      // // Preload audios
      // const audioWithNestedCharacter: Audio[] = audios.map((a) => {
      //   return { ...a, character: characters.find((c) => a.characterId === c.id) };
      // });
      // const stepWithNestedAudio: LessonStep[] = result.data.data.map((s) => {
      //   return { ...s, audio: audioWithNestedCharacter.find((a) => s.audioId === a.id) };
      // });
      // result.data = { ...result.data, data: stepWithNestedAudio };

      // // Preload quizzes
      // const stepWithNestedQuizz: LessonStep[] = stepWithNestedAudio.map((s) => {
      //   return { ...s, quiz: quizzes.find((q) => s.quizId === q.id) };
      // });
      // result.data = { ...result.data, data: stepWithNestedQuizz };

      // console.log(result.data);

      return camelizeKeys<LessonDetailResponse>(result.data);
    } catch (err) {
      if (isAxiosError(err)) {
        // 1. Network Error: không có response
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        // 2. HTTP Error với response: ưu tiên lấy message từ server
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }

      throw err;
    }
  },
};
