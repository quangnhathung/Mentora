import { type Dialog } from './types';

export const dialogs: Dialog[] = [
  {
    id: 1,
    characterId: 1,
    audio: 1,
  },

  {
    id: 2,
    characterId: 2,
    audio: 2,
  },

  {
    id: 3,
    characterId: 3,
    audio: 3,
  },
  {
    id: 4,
    characterId: 1,
    audio: 1,
  },
  {
    id: 5,
    characterId: 2,
    audio: 1,
  },
  {
    id: 6,
    characterId: 3,
    audio: 1,
  },
];

// export const useDialogData = {
//   getDialogs: async () => {
//     try {
//       const res = await client.get<AxiosResponse<DialogsResponse>>(
//         '/api-profile/v1/private/dialogs'
//       );
//     } catch (err) {}
//   },
// };
