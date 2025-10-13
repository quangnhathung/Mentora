// import { isAxiosError } from 'axios';

// import { type ApiResponse, ErrorCode } from '@/shared/api';
// import client from '@/shared/api/common/client';
// import { translate } from '@/shared/lib';
// import { camelizeKeys } from '@/shared/lib/camelize';

// import { QuizType } from '../enum';
// import {
//   type SingleChoiceListResponse,
//   type SingleChoiceParams,
//   type SingleChoiceResponse,
// } from './types';

// export const singleChoiceQuizzes: SingleChoiceListResponse = {
//   offset: 1,
//   limit: 10,
//   count: 100,
//   data: [
//     {
//       id: 1,
//       type: QuizType.SINGLE_CHOICE,
//       explanation: 'Which sentences are correct ?',

//       answers: [
//         { id: 'A', content: 'How old are you ?' },
//         { id: 'B', content: 'What’s up, buddy ?' },
//         { id: 'C', content: 'How can I help you ?' },
//         { id: 'D', content: 'Have you ever been there ?' },
//       ],
//       correctAnswer: 'D',
//     },
//     {
//       id: 2,
//       type: QuizType.SINGLE_CHOICE,

//       explanation: 'Which sentences are correct ?',
//       answers: [
//         { id: 'A', content: 'How old are you ?' },
//         { id: 'B', content: 'What’s up, buddy ?' },
//         { id: 'C', content: 'How can I help you ?' },
//         { id: 'D', content: 'Have you ever been there ?' },
//       ],
//       correctAnswer: 'D',
//     },
//   ],
// };

// export const SingleChoiceApi = {
//   getAll: async () => {
//     try {
//       const res = await client.get<ApiResponse<SingleChoiceListResponse>>(
//         '/api-profile/v1/private/singleChoiceQuizzes'
//       );

//       const result = res.data;
//       if (result.code !== ErrorCode.SUCCESS) {
//         throw new Error(result.message);
//       }

//       // console.log('getAll');
//       // console.log(result.data);
//       // console.log(camelizeKeys(result.data));

//       return camelizeKeys(result.data);
//     } catch (err) {
//       if (isAxiosError(err)) {
//         if (!err.response) throw new Error(translate('noti.error.network'));

//         const serverMsg = err.response.data?.message;
//         throw new Error(serverMsg ?? err.message);
//       }

//       throw err;
//     }
//   },

//   getById: async (params: SingleChoiceParams) => {
//     try {
//       const res = await client.get<ApiResponse<SingleChoiceResponse>>(
//         `/api-profile/v1/private/singleChoiceQuizzes/${params.quizId}`
//       );

//       const result = res.data;

//       if (result.code !== ErrorCode.SUCCESS) {
//         throw new Error(result.message);
//       }
//       result.data = { data: singleChoiceQuizzes.data.at(0)! };

//       return camelizeKeys<SingleChoiceListResponse>(result.data);
//     } catch (err) {
//       if (isAxiosError(err)) {
//         if (!err.response) throw new Error(translate('noti.error.network'));

//         const serverMsg = err.response.data?.message;
//         throw new Error(serverMsg ?? err.message);
//       }

//       throw err;
//     }
//   },
// };
