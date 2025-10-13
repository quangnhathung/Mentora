// import { type AxiosError } from 'axios';
// import { useEffect } from 'react';
// import { createQuery, type Middleware, type QueryHook } from 'react-query-kit';

// import { logger } from '@/shared/api';

// import { SingleChoiceApi } from './api';
// import { type SingleChoiceListResponse, type SingleChoiceParams } from './types';
// import { useSingleChoiceStore } from './useSingleChoiceStore';

// export const syncSingleChoiceMiddleware: Middleware<
//   QueryHook<SingleChoiceListResponse, void, AxiosError>
// > = (useQueryNext) => (options) => {
//   const result = useQueryNext(options);

//   useEffect(() => {
//     if (result.data) {
//       useSingleChoiceStore.getState().set(result.data);
//     }
//   }, [result]);

//   return result;
// };

// export const useSingleChoiceData = {
//   getById: createQuery<SingleChoiceListResponse, SingleChoiceParams, AxiosError>({
//     queryKey: [`/api-profile/v1/private/singleChoiceQuiz`],
//     fetcher: (params: SingleChoiceParams) => SingleChoiceApi.getById(params),
//     use: [logger],
//   }),
// };
