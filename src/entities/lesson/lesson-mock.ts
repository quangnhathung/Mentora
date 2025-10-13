import { type LessonDetailResponse } from '@/entities/lesson/types';

export const lessonDetailChunk: LessonDetailResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: [
    {
      order: 1,
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      context:
        "English conversation. Good morning. Thank you for coming in today. Let's start with a quick introduction. Can you tell me a little about yourself? Sure. My name is Laura and I recently finished my studies at school. I'm very motivated to start working and gain experience in a professional environment.",
      quizzes: [
        // {
        //   type: 'fill_in_blank',
        //   sentence: 'My name is ____ and I recently finished my studies at school.',
        //   answer: 'Laura',
        // },
      ],
      segments: [
        {
          id: 1,
          isNarrator: true,
          character: {
            id: 999,
            name: 'Paw',
            speaker: 'en-US-Neural2-I',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/paw.svg',
          },
          start: 0.031,
          end: 2.7,
          text: 'The interview is about to begin as everyone gets ready.',
          translations: [
            {
              lang: 'en',
              text: 'The interview is about to begin as everyone gets ready.',
            },
            {
              lang: 'vi',
              text: 'Buổi phỏng vấn sắp bắt đầu khi mọi người chuẩn bị sẵn sàng.',
            },
          ],
          words: [
            {
              text: 'The',
              start: 0.031,
              end: 0.152,
              score: 0.716,
            },
            {
              text: 'interview',
              start: 0.233,
              end: 0.597,
              score: 0.812,
            },
            {
              text: 'is',
              start: 0.658,
              end: 0.739,
              score: 0.647,
            },
            {
              text: 'about',
              start: 0.799,
              end: 0.981,
              score: 0.83,
            },
            {
              text: 'to',
              start: 1.002,
              end: 1.083,
              score: 0.816,
            },
            {
              text: 'begin',
              start: 1.123,
              end: 1.446,
              score: 0.726,
            },
            {
              text: 'as',
              start: 1.527,
              end: 1.608,
              score: 0.981,
            },
            {
              text: 'everyone',
              start: 1.709,
              end: 2.033,
              score: 0.857,
            },
            {
              text: 'gets',
              start: 2.094,
              end: 2.255,
              score: 0.874,
            },
            {
              text: 'ready.',
              start: 2.336,
              end: 2.7,
              score: 0.767,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-1.wav',
        },
        {
          id: 2,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 0.47,
          text: 'Good morning.',
          translations: [
            {
              lang: 'en',
              text: 'Good morning.',
            },
            {
              lang: 'vi',
              text: 'Chào buổi sáng.',
            },
          ],
          words: [
            {
              text: 'Good',
              start: 0.05,
              end: 0.19,
              score: 0.806,
            },
            {
              text: 'morning.',
              start: 0.21,
              end: 0.47,
              score: 0.816,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-2.wav',
        },
        {
          id: 3,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.092,
          text: 'Thank you for coming in today.',
          translations: [
            {
              lang: 'en',
              text: 'Thank you for coming in today.',
            },
            {
              lang: 'vi',
              text: 'Cảm ơn bạn đã đến hôm nay.',
            },
          ],
          words: [
            {
              text: 'Thank',
              start: 0.05,
              end: 0.211,
              score: 0.935,
            },
            {
              text: 'you',
              start: 0.231,
              end: 0.311,
              score: 0.638,
            },
            {
              text: 'for',
              start: 0.351,
              end: 0.451,
              score: 0.915,
            },
            {
              text: 'coming',
              start: 0.491,
              end: 0.691,
              score: 0.821,
            },
            {
              text: 'in',
              start: 0.731,
              end: 0.791,
              score: 0.992,
            },
            {
              text: 'today.',
              start: 0.831,
              end: 1.092,
              score: 0.858,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-3.wav',
        },
        {
          id: 4,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.892,
          text: "Let's start with a quick introduction.",
          translations: [
            {
              lang: 'en',
              text: "Let's start with a quick introduction.",
            },
            {
              lang: 'vi',
              text: 'Hãy bắt đầu với phần giới thiệu nhanh.',
            },
          ],
          words: [
            {
              text: "Let's",
              start: 0.05,
              end: 0.751,
              score: 0.825,
            },
            {
              text: 'start',
              start: 0.791,
              end: 0.971,
              score: 0.818,
            },
            {
              text: 'with',
              start: 1.011,
              end: 1.091,
              score: 0.998,
            },
            {
              text: 'a',
              start: 1.151,
              end: 1.171,
              score: 1,
            },
            {
              text: 'quick',
              start: 1.211,
              end: 1.371,
              score: 0.845,
            },
            {
              text: 'introduction.',
              start: 1.411,
              end: 1.892,
              score: 0.869,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-4.wav',
        },
        {
          id: 5,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.472,
          text: 'Can you tell me a little about yourself?',
          translations: [
            {
              lang: 'en',
              text: 'Can you tell me a little about yourself?',
            },
            {
              lang: 'vi',
              text: 'Bạn có thể giới thiệu đôi chút về bản thân không?',
            },
          ],
          words: [
            {
              text: 'Can',
              start: 0.05,
              end: 0.15,
              score: 0.997,
            },
            {
              text: 'you',
              start: 0.19,
              end: 0.27,
              score: 0.777,
            },
            {
              text: 'tell',
              start: 0.33,
              end: 0.471,
              score: 0.939,
            },
            {
              text: 'me',
              start: 0.491,
              end: 0.551,
              score: 0.839,
            },
            {
              text: 'a',
              start: 0.591,
              end: 0.631,
              score: 0.5,
            },
            {
              text: 'little',
              start: 0.671,
              end: 0.851,
              score: 0.912,
            },
            {
              text: 'about',
              start: 0.891,
              end: 1.071,
              score: 0.984,
            },
            {
              text: 'yourself?',
              start: 1.091,
              end: 1.472,
              score: 0.812,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-5.wav',
        },
        {
          id: 6,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 0.291,
          text: 'Sure.',
          translations: [
            {
              lang: 'en',
              text: 'Sure.',
            },
            {
              lang: 'vi',
              text: 'Chắc chắn rồi.',
            },
          ],
          words: [
            {
              text: 'Sure.',
              start: 0.05,
              end: 0.291,
              score: 0.92,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-6.wav',
        },
        {
          id: 7,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 3.915,
          text: 'My name is Laura and I recently finished my studies at school.',
          translations: [
            {
              lang: 'en',
              text: 'My name is Laura and I recently finished my studies at school.',
            },
            {
              lang: 'vi',
              text: 'Tôi tên là Laura và tôi vừa hoàn thành việc học ở trường.',
            },
          ],
          words: [
            {
              text: 'My',
              start: 0.05,
              end: 0.631,
              score: 0.853,
            },
            {
              text: 'name',
              start: 0.671,
              end: 0.811,
              score: 0.677,
            },
            {
              text: 'is',
              start: 0.871,
              end: 0.931,
              score: 0.752,
            },
            {
              text: 'Laura',
              start: 1.011,
              end: 1.351,
              score: 0.951,
            },
            {
              text: 'and',
              start: 1.392,
              end: 1.892,
              score: 0.616,
            },
            {
              text: 'I',
              start: 1.932,
              end: 1.992,
              score: 0.971,
            },
            {
              text: 'recently',
              start: 2.032,
              end: 2.493,
              score: 0.867,
            },
            {
              text: 'finished',
              start: 2.553,
              end: 2.853,
              score: 0.883,
            },
            {
              text: 'my',
              start: 2.913,
              end: 3.014,
              score: 0.987,
            },
            {
              text: 'studies',
              start: 3.074,
              end: 3.414,
              score: 0.87,
            },
            {
              text: 'at',
              start: 3.474,
              end: 3.534,
              score: 0.928,
            },
            {
              text: 'school.',
              start: 3.574,
              end: 3.915,
              score: 0.673,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-7.wav',
        },
        {
          id: 8,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 4.756,
          text: "I'm very motivated to start working and gain experience in a professional environment.",
          translations: [
            {
              lang: 'en',
              text: "I'm very motivated to start working and gain experience in a professional environment.",
            },
            {
              lang: 'vi',
              text: 'Tôi rất có động lực để bắt đầu làm việc và tích lũy kinh nghiệm trong môi trường chuyên nghiệp.',
            },
          ],
          words: [
            {
              text: "I'm",
              start: 0.05,
              end: 0.171,
              score: 0.971,
            },
            {
              text: 'very',
              start: 0.231,
              end: 0.451,
              score: 0.826,
            },
            {
              text: 'motivated',
              start: 0.531,
              end: 1.132,
              score: 0.924,
            },
            {
              text: 'to',
              start: 1.172,
              end: 1.352,
              score: 0.794,
            },
            {
              text: 'start',
              start: 1.412,
              end: 1.632,
              score: 0.811,
            },
            {
              text: 'working',
              start: 1.712,
              end: 2.133,
              score: 0.747,
            },
            {
              text: 'and',
              start: 2.333,
              end: 2.413,
              score: 0.831,
            },
            {
              text: 'gain',
              start: 2.453,
              end: 2.674,
              score: 0.752,
            },
            {
              text: 'experience',
              start: 2.714,
              end: 3.375,
              score: 0.771,
            },
            {
              text: 'in',
              start: 3.495,
              end: 3.555,
              score: 0.998,
            },
            {
              text: 'a',
              start: 3.595,
              end: 3.615,
              score: 0.999,
            },
            {
              text: 'professional',
              start: 3.695,
              end: 4.216,
              score: 0.832,
            },
            {
              text: 'environment.',
              start: 4.276,
              end: 4.756,
              score: 0.857,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/1-8.wav',
        },
      ],
      id: 1,
    },
    {
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-08.jpg',
      order: 2,
      context:
        "That's great. Why are you interested in this job? I believe this job is a great opportunity to learn and grow. I'm eager to develop my skills and contribute to the company with my dedication and enthusiasm.",
      quizzes: [
        // {
        //   type: 'single_choice',
        //   question: 'Why is Laura interested in this job?',
        //   options: ['To learn and grow', 'To earn money immediately', "Because it's close to home"],
        //   correctIndex: 0,
        // },
      ],
      segments: [
        {
          id: 0,
          isNarrator: true,
          character: {
            id: 999,
            name: 'Paw',
            speaker: 'en-US-Neural2-I',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/paw.svg',
          },
          start: 0.031,
          end: 3.527,
          text: 'The interviewer now wants to know why Laura is interested in the job.',
          translations: [
            {
              lang: 'en',
              text: 'The interviewer now wants to know why Laura is interested in the job.',
            },
            {
              lang: 'vi',
              text: 'Người phỏng vấn muốn biết lý do tại sao Laura quan tâm đến công việc này.',
            },
          ],
          words: [
            {
              text: 'The',
              start: 0.031,
              end: 0.152,
              score: 0.655,
            },
            {
              text: 'interviewer',
              start: 0.233,
              end: 0.738,
              score: 0.86,
            },
            {
              text: 'now',
              start: 0.799,
              end: 0.92,
              score: 0.8,
            },
            {
              text: 'wants',
              start: 0.961,
              end: 1.183,
              score: 0.814,
            },
            {
              text: 'to',
              start: 1.223,
              end: 1.284,
              score: 0.417,
            },
            {
              text: 'know',
              start: 1.345,
              end: 1.466,
              score: 0.754,
            },
            {
              text: 'why',
              start: 1.526,
              end: 1.688,
              score: 0.832,
            },
            {
              text: 'Laura',
              start: 1.729,
              end: 2.113,
              score: 0.834,
            },
            {
              text: 'is',
              start: 2.173,
              end: 2.234,
              score: 0.756,
            },
            {
              text: 'interested',
              start: 2.315,
              end: 2.739,
              score: 0.892,
            },
            {
              text: 'in',
              start: 2.8,
              end: 2.84,
              score: 1,
            },
            {
              text: 'the',
              start: 2.881,
              end: 2.961,
              score: 0.987,
            },
            {
              text: 'job.',
              start: 3.002,
              end: 3.527,
              score: 0.901,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/2-0.wav',
        },
        {
          id: 9,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 0.471,
          text: "That's great.",
          translations: [
            {
              lang: 'en',
              text: "That's great.",
            },
            {
              lang: 'vi',
              text: 'Tuyệt vời.',
            },
          ],
          words: [
            {
              text: "That's",
              start: 0.05,
              end: 0.21,
              score: 0.818,
            },
            {
              text: 'great.',
              start: 0.25,
              end: 0.471,
              score: 0.843,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/2-9.wav',
        },
        {
          id: 10,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.472,
          text: 'Why are you interested in this job?',
          translations: [
            {
              lang: 'en',
              text: 'Why are you interested in this job?',
            },
            {
              lang: 'vi',
              text: 'Tại sao bạn quan tâm đến công việc này?',
            },
          ],
          words: [
            {
              text: 'Why',
              start: 0.05,
              end: 0.15,
              score: 0.959,
            },
            {
              text: 'are',
              start: 0.17,
              end: 0.23,
              score: 1,
            },
            {
              text: 'you',
              start: 0.25,
              end: 0.331,
              score: 0.739,
            },
            {
              text: 'interested',
              start: 0.371,
              end: 0.691,
              score: 0.789,
            },
            {
              text: 'in',
              start: 0.731,
              end: 0.771,
              score: 1,
            },
            {
              text: 'this',
              start: 0.811,
              end: 0.931,
              score: 0.703,
            },
            {
              text: 'job?',
              start: 0.971,
              end: 1.472,
              score: 0.923,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/2-10.wav',
        },
        {
          id: 11,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 3.034,
          text: 'I believe this job is a great opportunity to learn and grow.',
          translations: [
            {
              lang: 'en',
              text: 'I believe this job is a great opportunity to learn and grow.',
            },
            {
              lang: 'vi',
              text: 'Tôi tin rằng công việc này là cơ hội tuyệt vời để học hỏi và phát triển.',
            },
          ],
          words: [
            {
              text: 'I',
              start: 0.05,
              end: 0.21,
              score: 0.751,
            },
            {
              text: 'believe',
              start: 0.29,
              end: 0.611,
              score: 0.772,
            },
            {
              text: 'this',
              start: 0.631,
              end: 0.791,
              score: 0.726,
            },
            {
              text: 'job',
              start: 0.851,
              end: 1.071,
              score: 0.996,
            },
            {
              text: 'is',
              start: 1.131,
              end: 1.192,
              score: 0.787,
            },
            {
              text: 'a',
              start: 1.232,
              end: 1.272,
              score: 0.5,
            },
            {
              text: 'great',
              start: 1.332,
              end: 1.532,
              score: 0.989,
            },
            {
              text: 'opportunity',
              start: 1.612,
              end: 2.173,
              score: 0.775,
            },
            {
              text: 'to',
              start: 2.233,
              end: 2.353,
              score: 0.87,
            },
            {
              text: 'learn',
              start: 2.373,
              end: 2.633,
              score: 0.619,
            },
            {
              text: 'and',
              start: 2.673,
              end: 2.754,
              score: 0.816,
            },
            {
              text: 'grow.',
              start: 2.794,
              end: 3.034,
              score: 0.817,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/2-11.wav',
        },
        {
          id: 12,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 6.579,
          text: "I'm eager to develop my skills and contribute to the company with my dedication and enthusiasm.",
          translations: [
            {
              lang: 'en',
              text: "I'm eager to develop my skills and contribute to the company with my dedication and enthusiasm.",
            },
            {
              lang: 'vi',
              text: 'Tôi rất mong muốn phát triển kỹ năng và đóng góp cho công ty bằng sự tận tâm và nhiệt huyết của mình.',
            },
          ],
          words: [
            {
              text: "I'm",
              start: 0.05,
              end: 0.751,
              score: 0.973,
            },
            {
              text: 'eager',
              start: 0.831,
              end: 1.051,
              score: 0.796,
            },
            {
              text: 'to',
              start: 1.111,
              end: 1.192,
              score: 0.895,
            },
            {
              text: 'develop',
              start: 1.252,
              end: 1.612,
              score: 0.838,
            },
            {
              text: 'my',
              start: 1.652,
              end: 1.752,
              score: 0.92,
            },
            {
              text: 'skills',
              start: 1.872,
              end: 2.253,
              score: 0.916,
            },
            {
              text: 'and',
              start: 2.433,
              end: 2.513,
              score: 0.682,
            },
            {
              text: 'contribute',
              start: 2.573,
              end: 3.094,
              score: 0.74,
            },
            {
              text: 'to',
              start: 3.134,
              end: 3.234,
              score: 0.833,
            },
            {
              text: 'the',
              start: 3.274,
              end: 3.334,
              score: 0.995,
            },
            {
              text: 'company',
              start: 3.435,
              end: 3.875,
              score: 0.928,
            },
            {
              text: 'with',
              start: 3.895,
              end: 4.536,
              score: 0.839,
            },
            {
              text: 'my',
              start: 4.596,
              end: 4.696,
              score: 0.834,
            },
            {
              text: 'dedication',
              start: 4.756,
              end: 5.417,
              score: 0.824,
            },
            {
              text: 'and',
              start: 5.738,
              end: 5.798,
              score: 0.715,
            },
            {
              text: 'enthusiasm.',
              start: 5.878,
              end: 6.579,
              score: 0.939,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/2-12.wav',
        },
      ],
      id: 2,
    },
    {
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-06.jpg',
      order: 3,
      context:
        "I see. Since you're just starting your career, can you tell me about any experiences from school or other activities that helped you develop useful skills? Of course. In school, I worked on many group projects, which taught me teamwork and problem solving. I also participated in a club, volunteer work, sports, et cetera, where I learned responsibility, time management, and how to work with different people.",
      quizzes: [
        // {
        //   type: 'true_false',
        //   statement: 'Laura mentions teamwork and volunteer work among her experiences.',
        //   answer: true,
        // },
      ],
      segments: [
        {
          id: 0,
          isNarrator: true,
          character: {
            id: 999,
            name: 'Paw',
            speaker: 'en-US-Neural2-I',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/paw.svg',
          },
          start: 0.031,
          end: 5.13,
          text: 'Since Laura is just starting her career, she is asked about her school and other experiences.',
          translations: [
            {
              lang: 'en',
              text: 'Since Laura is just starting her career, she is asked about her school and other experiences.',
            },
            {
              lang: 'vi',
              text: 'Vì Laura mới bắt đầu sự nghiệp, cô ấy được hỏi về trải nghiệm ở trường và các hoạt động khác.',
            },
          ],
          words: [
            {
              text: 'Since',
              start: 0.031,
              end: 0.273,
              score: 0.743,
            },
            {
              text: 'Laura',
              start: 0.353,
              end: 0.676,
              score: 0.813,
            },
            {
              text: 'is',
              start: 0.736,
              end: 0.797,
              score: 0.76,
            },
            {
              text: 'just',
              start: 0.878,
              end: 1.099,
              score: 0.911,
            },
            {
              text: 'starting',
              start: 1.14,
              end: 1.462,
              score: 0.93,
            },
            {
              text: 'her',
              start: 1.502,
              end: 1.603,
              score: 0.675,
            },
            {
              text: 'career,',
              start: 1.664,
              end: 2.026,
              score: 0.829,
            },
            {
              text: 'she',
              start: 2.389,
              end: 2.47,
              score: 0.875,
            },
            {
              text: 'is',
              start: 2.55,
              end: 2.611,
              score: 0.728,
            },
            {
              text: 'asked',
              start: 2.752,
              end: 2.933,
              score: 0.887,
            },
            {
              text: 'about',
              start: 2.994,
              end: 3.155,
              score: 1,
            },
            {
              text: 'her',
              start: 3.195,
              end: 3.276,
              score: 0.906,
            },
            {
              text: 'school',
              start: 3.357,
              end: 3.679,
              score: 0.858,
            },
            {
              text: 'and',
              start: 3.78,
              end: 3.86,
              score: 0.977,
            },
            {
              text: 'other',
              start: 3.961,
              end: 4.122,
              score: 0.796,
            },
            {
              text: 'experiences.',
              start: 4.183,
              end: 5.13,
              score: 0.867,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/3-0.wav',
        },
        {
          id: 13,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 0.811,
          text: 'I see.',
          translations: [
            {
              lang: 'en',
              text: 'I see.',
            },
            {
              lang: 'vi',
              text: 'Tôi hiểu.',
            },
          ],
          words: [
            {
              text: 'I',
              start: 0.05,
              end: 0.591,
              score: 0.926,
            },
            {
              text: 'see.',
              start: 0.651,
              end: 0.811,
              score: 0.968,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/3-13.wav',
        },
        {
          id: 14,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 7.58,
          text: "Since you're just starting your career, can you tell me about any experiences from school or other activities that helped you develop useful skills?",
          translations: [
            {
              lang: 'en',
              text: "Since you're just starting your career, can you tell me about any experiences from school or other activities that helped you develop useful skills?",
            },
            {
              lang: 'vi',
              text: 'Vì bạn mới bắt đầu sự nghiệp, bạn có thể kể về những trải nghiệm ở trường hoặc hoạt động khác giúp bạn phát triển các kỹ năng hữu ích không?',
            },
          ],
          words: [
            {
              text: 'Since',
              start: 0.05,
              end: 0.23,
              score: 0.948,
            },
            {
              text: "you're",
              start: 0.27,
              end: 0.431,
              score: 0.74,
            },
            {
              text: 'just',
              start: 0.471,
              end: 0.631,
              score: 0.947,
            },
            {
              text: 'starting',
              start: 0.691,
              end: 0.991,
              score: 0.953,
            },
            {
              text: 'your',
              start: 1.031,
              end: 1.151,
              score: 0.688,
            },
            {
              text: 'career,',
              start: 1.232,
              end: 1.492,
              score: 0.697,
            },
            {
              text: 'can',
              start: 1.552,
              end: 2.233,
              score: 0.977,
            },
            {
              text: 'you',
              start: 2.273,
              end: 2.353,
              score: 0.691,
            },
            {
              text: 'tell',
              start: 2.413,
              end: 2.533,
              score: 0.916,
            },
            {
              text: 'me',
              start: 2.553,
              end: 2.613,
              score: 0.75,
            },
            {
              text: 'about',
              start: 2.653,
              end: 2.794,
              score: 0.83,
            },
            {
              text: 'any',
              start: 2.894,
              end: 3.014,
              score: 0.937,
            },
            {
              text: 'experiences',
              start: 3.074,
              end: 3.595,
              score: 0.873,
            },
            {
              text: 'from',
              start: 3.635,
              end: 3.775,
              score: 0.982,
            },
            {
              text: 'school',
              start: 3.795,
              end: 4.236,
              score: 0.61,
            },
            {
              text: 'or',
              start: 4.316,
              end: 4.376,
              score: 0.879,
            },
            {
              text: 'other',
              start: 4.396,
              end: 4.636,
              score: 0.466,
            },
            {
              text: 'activities',
              start: 4.676,
              end: 5.137,
              score: 0.774,
            },
            {
              text: 'that',
              start: 5.197,
              end: 5.337,
              score: 0.853,
            },
            {
              text: 'helped',
              start: 5.838,
              end: 6.018,
              score: 0.886,
            },
            {
              text: 'you',
              start: 6.058,
              end: 6.178,
              score: 0.849,
            },
            {
              text: 'develop',
              start: 6.218,
              end: 6.559,
              score: 0.942,
            },
            {
              text: 'useful',
              start: 6.679,
              end: 6.959,
              score: 0.871,
            },
            {
              text: 'skills?',
              start: 6.999,
              end: 7.58,
              score: 0.859,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/3-14.wav',
        },
        {
          id: 15,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 0.651,
          text: 'Of course.',
          translations: [
            {
              lang: 'en',
              text: 'Of course.',
            },
            {
              lang: 'vi',
              text: 'Tất nhiên rồi.',
            },
          ],
          words: [
            {
              text: 'Of',
              start: 0.05,
              end: 0.19,
              score: 0.874,
            },
            {
              text: 'course.',
              start: 0.23,
              end: 0.651,
              score: 0.712,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/3-15.wav',
        },
        {
          id: 16,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 4.836,
          text: 'In school, I worked on many group projects, which taught me teamwork and problem solving.',
          translations: [
            {
              lang: 'en',
              text: 'In school, I worked on many group projects, which taught me teamwork and problem solving.',
            },
            {
              lang: 'vi',
              text: 'Ở trường, tôi tham gia nhiều dự án nhóm, điều đó dạy tôi kỹ năng làm việc nhóm và giải quyết vấn đề.',
            },
          ],
          words: [
            {
              text: 'In',
              start: 0.05,
              end: 0.131,
              score: 0.952,
            },
            {
              text: 'school,',
              start: 0.191,
              end: 0.511,
              score: 0.636,
            },
            {
              text: 'I',
              start: 0.911,
              end: 0.951,
              score: 0.793,
            },
            {
              text: 'worked',
              start: 1.011,
              end: 1.192,
              score: 0.914,
            },
            {
              text: 'on',
              start: 1.252,
              end: 1.312,
              score: 0.906,
            },
            {
              text: 'many',
              start: 1.372,
              end: 1.592,
              score: 0.818,
            },
            {
              text: 'group',
              start: 1.632,
              end: 1.832,
              score: 0.863,
            },
            {
              text: 'projects,',
              start: 1.872,
              end: 2.393,
              score: 0.944,
            },
            {
              text: 'which',
              start: 2.874,
              end: 3.034,
              score: 0.967,
            },
            {
              text: 'taught',
              start: 3.094,
              end: 3.274,
              score: 0.892,
            },
            {
              text: 'me',
              start: 3.294,
              end: 3.394,
              score: 0.832,
            },
            {
              text: 'teamwork',
              start: 3.454,
              end: 3.915,
              score: 0.872,
            },
            {
              text: 'and',
              start: 3.995,
              end: 4.055,
              score: 0.921,
            },
            {
              text: 'problem',
              start: 4.115,
              end: 4.475,
              score: 0.776,
            },
            {
              text: 'solving.',
              start: 4.495,
              end: 4.836,
              score: 0.885,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/3-16.wav',
        },
        {
          id: 17,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 10.561,
          text: 'I also participated in a club, volunteer work, sports, et cetera, where I learned responsibility, time management, and how to work with different people.',
          translations: [
            {
              lang: 'en',
              text: 'I also participated in a club, volunteer work, sports, et cetera, where I learned responsibility, time management, and how to work with different people.',
            },
            {
              lang: 'vi',
              text: 'Tôi cũng tham gia câu lạc bộ, làm tình nguyện, thể thao, v.v., nơi tôi học được tinh thần trách nhiệm, quản lý thời gian và cách làm việc với nhiều người khác nhau.',
            },
          ],
          words: [
            {
              text: 'I',
              start: 0.05,
              end: 0.11,
              score: 0.638,
            },
            {
              text: 'also',
              start: 0.23,
              end: 0.47,
              score: 0.964,
            },
            {
              text: 'participated',
              start: 0.51,
              end: 1.311,
              score: 0.923,
            },
            {
              text: 'in',
              start: 1.471,
              end: 1.571,
              score: 0.814,
            },
            {
              text: 'a',
              start: 1.591,
              end: 1.611,
              score: 1,
            },
            {
              text: 'club,',
              start: 2.372,
              end: 2.713,
              score: 0.902,
            },
            {
              text: 'volunteer',
              start: 3.053,
              end: 3.573,
              score: 0.82,
            },
            {
              text: 'work,',
              start: 3.614,
              end: 4.274,
              score: 0.903,
            },
            {
              text: 'sports,',
              start: 4.294,
              end: 4.775,
              score: 0.844,
            },
            {
              text: 'et',
              start: 5.095,
              end: 5.155,
              score: 0.982,
            },
            {
              text: 'cetera,',
              start: 5.195,
              end: 5.536,
              score: 0.972,
            },
            {
              text: 'where',
              start: 5.996,
              end: 6.136,
              score: 0.917,
            },
            {
              text: 'I',
              start: 6.176,
              end: 6.196,
              score: 0.996,
            },
            {
              text: 'learned',
              start: 6.236,
              end: 6.497,
              score: 0.661,
            },
            {
              text: 'responsibility,',
              start: 6.537,
              end: 7.538,
              score: 0.817,
            },
            {
              text: 'time',
              start: 7.578,
              end: 8.098,
              score: 0.76,
            },
            {
              text: 'management,',
              start: 8.159,
              end: 8.759,
              score: 0.732,
            },
            {
              text: 'and',
              start: 9.18,
              end: 9.26,
              score: 0.897,
            },
            {
              text: 'how',
              start: 9.3,
              end: 9.44,
              score: 0.629,
            },
            {
              text: 'to',
              start: 9.48,
              end: 9.52,
              score: 0.923,
            },
            {
              text: 'work',
              start: 9.58,
              end: 9.74,
              score: 0.906,
            },
            {
              text: 'with',
              start: 9.78,
              end: 9.88,
              score: 0.989,
            },
            {
              text: 'different',
              start: 9.92,
              end: 10.201,
              score: 0.834,
            },
            {
              text: 'people.',
              start: 10.241,
              end: 10.561,
              score: 0.772,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/3-17.wav',
        },
      ],
      id: 3,
    },
    {
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-01.webp',
      order: 4,
      context:
        "That's good. What do you think are your strengths? I'm a fast learner, very organized, and I always do my best in everything I do. And what about areas where you think you can improve? Since this would be my first job, I still need to get used to a professional environment. But I'm very open to learning and improving quickly. That's a great attitude. Finally, where do you see yourself in the next few years? In the next few years, I hope to develop my skills and gain more confidence in a professional setting. My goal is to take on more responsibilities and grow within the company, contributing in the best way possible.",
      quizzes: [
        // {
        //   type: 'fill_in_blank',
        //   sentence: "I'm a fast learner, very ____ , and I always do my best.",
        //   answer: 'organized',
        // },
      ],
      segments: [
        {
          id: 0,
          isNarrator: true,
          character: {
            id: 999,
            name: 'Paw',
            speaker: 'en-US-Neural2-I',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/paw.svg',
          },
          start: 0.031,
          end: 5.029,
          text: 'The conversation turns to Laura’s strengths, areas to improve, and her future goals.',
          translations: [
            {
              lang: 'en',
              text: 'The conversation turns to Laura’s strengths, areas to improve, and her future goals.',
            },
            {
              lang: 'vi',
              text: 'Cuộc trò chuyện chuyển sang điểm mạnh, điểm cần cải thiện và mục tiêu tương lai của Laura.',
            },
          ],
          words: [
            {
              text: 'The',
              start: 0.031,
              end: 0.152,
              score: 0.762,
            },
            {
              text: 'conversation',
              start: 0.212,
              end: 0.918,
              score: 0.909,
            },
            {
              text: 'turns',
              start: 0.998,
              end: 1.22,
              score: 0.864,
            },
            {
              text: 'to',
              start: 1.301,
              end: 1.381,
              score: 0.953,
            },
            {
              text: "Laura's",
              start: 1.442,
              end: 1.784,
              score: 0.703,
            },
            {
              text: 'strengths,',
              start: 1.845,
              end: 2.288,
              score: 0.675,
            },
            {
              text: 'areas',
              start: 2.631,
              end: 2.953,
              score: 0.654,
            },
            {
              text: 'to',
              start: 2.994,
              end: 3.074,
              score: 0.985,
            },
            {
              text: 'improve,',
              start: 3.135,
              end: 3.598,
              score: 0.88,
            },
            {
              text: 'and',
              start: 3.8,
              end: 3.86,
              score: 0.939,
            },
            {
              text: 'her',
              start: 3.921,
              end: 4.021,
              score: 0.877,
            },
            {
              text: 'future',
              start: 4.062,
              end: 4.384,
              score: 0.856,
            },
            {
              text: 'goals.',
              start: 4.425,
              end: 5.029,
              score: 0.811,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-0.wav',
        },
        {
          id: 18,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 0.41,
          text: "That's good.",
          translations: [
            {
              lang: 'en',
              text: "That's good.",
            },
            {
              lang: 'vi',
              text: 'Tốt lắm.',
            },
          ],
          words: [
            {
              text: "That's",
              start: 0.05,
              end: 0.21,
              score: 0.841,
            },
            {
              text: 'good.',
              start: 0.25,
              end: 0.41,
              score: 0.848,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-18.wav',
        },
        {
          id: 19,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.731,
          text: 'What do you think are your strengths?',
          translations: [
            {
              lang: 'en',
              text: 'What do you think are your strengths?',
            },
            {
              lang: 'vi',
              text: 'Bạn nghĩ điểm mạnh của mình là gì?',
            },
          ],
          words: [
            {
              text: 'What',
              start: 0.05,
              end: 0.13,
              score: 0.998,
            },
            {
              text: 'do',
              start: 0.15,
              end: 0.21,
              score: 0.62,
            },
            {
              text: 'you',
              start: 0.25,
              end: 0.33,
              score: 0.994,
            },
            {
              text: 'think',
              start: 0.37,
              end: 0.51,
              score: 0.88,
            },
            {
              text: 'are',
              start: 0.57,
              end: 0.63,
              score: 0.387,
            },
            {
              text: 'your',
              start: 0.67,
              end: 0.81,
              score: 0.855,
            },
            {
              text: 'strengths?',
              start: 0.83,
              end: 1.731,
              score: 0.811,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-19.wav',
        },
        {
          id: 20,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 4.896,
          text: "I'm a fast learner, very organized, and I always do my best in everything I do.",
          translations: [
            {
              lang: 'en',
              text: "I'm a fast learner, very organized, and I always do my best in everything I do.",
            },
            {
              lang: 'vi',
              text: 'Tôi học nhanh, rất có tổ chức và luôn cố gắng hết mình trong mọi việc tôi làm.',
            },
          ],
          words: [
            {
              text: "I'm",
              start: 0.05,
              end: 0.171,
              score: 0.974,
            },
            {
              text: 'a',
              start: 0.211,
              end: 0.231,
              score: 0.995,
            },
            {
              text: 'fast',
              start: 0.311,
              end: 0.571,
              score: 0.831,
            },
            {
              text: 'learner,',
              start: 0.631,
              end: 0.991,
              score: 0.806,
            },
            {
              text: 'very',
              start: 1.392,
              end: 1.632,
              score: 0.936,
            },
            {
              text: 'organized,',
              start: 1.752,
              end: 2.293,
              score: 0.784,
            },
            {
              text: 'and',
              start: 2.753,
              end: 2.834,
              score: 0.859,
            },
            {
              text: 'I',
              start: 2.874,
              end: 2.914,
              score: 0.748,
            },
            {
              text: 'always',
              start: 3.034,
              end: 3.274,
              score: 0.826,
            },
            {
              text: 'do',
              start: 3.334,
              end: 3.434,
              score: 0.998,
            },
            {
              text: 'my',
              start: 3.474,
              end: 3.574,
              score: 0.804,
            },
            {
              text: 'best',
              start: 3.634,
              end: 3.915,
              score: 0.839,
            },
            {
              text: 'in',
              start: 3.995,
              end: 4.055,
              score: 0.994,
            },
            {
              text: 'everything',
              start: 4.195,
              end: 4.535,
              score: 0.8,
            },
            {
              text: 'I',
              start: 4.595,
              end: 4.656,
              score: 0.984,
            },
            {
              text: 'do.',
              start: 4.696,
              end: 4.896,
              score: 0.93,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-20.wav',
        },
        {
          id: 21,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 2.533,
          text: 'And what about areas where you think you can improve?',
          translations: [
            {
              lang: 'en',
              text: 'And what about areas where you think you can improve?',
            },
            {
              lang: 'vi',
              text: 'Thế còn những điểm bạn nghĩ mình có thể cải thiện?',
            },
          ],
          words: [
            {
              text: 'And',
              start: 0.05,
              end: 0.13,
              score: 0.924,
            },
            {
              text: 'what',
              start: 0.17,
              end: 0.291,
              score: 0.845,
            },
            {
              text: 'about',
              start: 0.331,
              end: 0.511,
              score: 0.828,
            },
            {
              text: 'areas',
              start: 0.691,
              end: 0.991,
              score: 0.844,
            },
            {
              text: 'where',
              start: 1.031,
              end: 1.192,
              score: 0.582,
            },
            {
              text: 'you',
              start: 1.252,
              end: 1.372,
              score: 0.995,
            },
            {
              text: 'think',
              start: 1.452,
              end: 1.632,
              score: 0.918,
            },
            {
              text: 'you',
              start: 1.672,
              end: 1.772,
              score: 0.999,
            },
            {
              text: 'can',
              start: 1.812,
              end: 1.912,
              score: 0.934,
            },
            {
              text: 'improve?',
              start: 1.972,
              end: 2.533,
              score: 0.871,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-21.wav',
        },
        {
          id: 22,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 4.676,
          text: 'Since this would be my first job, I still need to get used to a professional environment.',
          translations: [
            {
              lang: 'en',
              text: 'Since this would be my first job, I still need to get used to a professional environment.',
            },
            {
              lang: 'vi',
              text: 'Vì đây sẽ là công việc đầu tiên của tôi, tôi vẫn cần làm quen với môi trường chuyên nghiệp.',
            },
          ],
          words: [
            { text: 'Since', start: 0.031, end: 0.374, score: 0.8 },
            { text: 'this', start: 0.414, end: 0.575, score: 0.97 },
            { text: 'would', start: 0.615, end: 0.756, score: 0.736 },
            { text: 'be', start: 0.777, end: 0.857, score: 0.83 },
            { text: 'my', start: 0.918, end: 0.998, score: 0.75 },
            { text: 'first', start: 1.099, end: 1.341, score: 0.853 },
            { text: 'job,', start: 1.421, end: 1.744, score: 0.978 },
            { text: 'I', start: 2.207, end: 2.268, score: 0.999 },
            { text: 'still', start: 2.328, end: 2.509, score: 0.889 },
            { text: 'need', start: 2.55, end: 2.691, score: 0.897 },
            { text: 'to', start: 2.731, end: 2.791, score: 0.748 },
            { text: 'get', start: 2.852, end: 2.993, score: 0.996 },
            { text: 'used', start: 3.033, end: 3.356, score: 0.808 },
            { text: 'to', start: 3.396, end: 3.497, score: 0.938 },
            { text: 'a', start: 3.537, end: 3.577, score: 0.5 },
            {
              text: 'professional',
              start: 3.638,
              end: 4.141,
              score: 0.903,
            },
            {
              text: 'environment,',
              start: 4.202,
              end: 4.685,
              score: 0.854,
            },
            { text: 'but', start: 5.33, end: 5.532, score: 0.995 },
            { text: "I'm", start: 5.632, end: 5.753, score: 0.912 },
            { text: 'very', start: 5.794, end: 5.995, score: 0.789 },
            { text: 'open', start: 6.156, end: 6.398, score: 0.918 },
            { text: 'to', start: 6.438, end: 6.539, score: 0.868 },
            { text: 'learning', start: 6.62, end: 7.003, score: 0.845 },
            { text: 'and', start: 7.204, end: 7.265, score: 0.858 },
            { text: 'improving', start: 7.345, end: 7.728, score: 0.973 },
            { text: 'quickly.', start: 7.788, end: 8.151, score: 0.842 },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-22.wav',
        },
        {
          id: 24,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.011,
          text: "That's a great attitude.",
          translations: [
            {
              lang: 'en',
              text: "That's a great attitude.",
            },
            {
              lang: 'vi',
              text: 'Thái độ đó rất tuyệt.',
            },
          ],
          words: [
            {
              text: "That's",
              start: 0.05,
              end: 0.23,
              score: 0.891,
            },
            {
              text: 'a',
              start: 0.271,
              end: 0.291,
              score: 0.943,
            },
            {
              text: 'great',
              start: 0.351,
              end: 0.531,
              score: 0.92,
            },
            {
              text: 'attitude.',
              start: 0.611,
              end: 1.011,
              score: 0.894,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-24.wav',
        },
        {
          id: 25,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 2.092,
          text: 'Finally, where do you see yourself in the next few years?',
          translations: [
            {
              lang: 'en',
              text: 'Finally, where do you see yourself in the next few years?',
            },
            {
              lang: 'vi',
              text: 'Cuối cùng, bạn thấy mình ở đâu trong vài năm tới?',
            },
          ],
          words: [
            {
              text: 'Finally,',
              start: 0.05,
              end: 0.37,
              score: 0.824,
            },
            {
              text: 'where',
              start: 0.41,
              end: 0.55,
              score: 0.579,
            },
            {
              text: 'do',
              start: 0.57,
              end: 0.63,
              score: 0.642,
            },
            {
              text: 'you',
              start: 0.65,
              end: 0.75,
              score: 0.949,
            },
            {
              text: 'see',
              start: 0.79,
              end: 0.911,
              score: 0.906,
            },
            {
              text: 'yourself',
              start: 0.931,
              end: 1.231,
              score: 0.79,
            },
            {
              text: 'in',
              start: 1.291,
              end: 1.331,
              score: 0.855,
            },
            {
              text: 'the',
              start: 1.351,
              end: 1.431,
              score: 0.831,
            },
            {
              text: 'next',
              start: 1.471,
              end: 1.631,
              score: 0.866,
            },
            {
              text: 'few',
              start: 1.672,
              end: 1.812,
              score: 0.99,
            },
            {
              text: 'years?',
              start: 1.852,
              end: 2.092,
              score: 0.874,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-25.wav',
        },
        {
          id: 26,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 5.536,
          text: 'In the next few years, I hope to develop my skills and gain more confidence in a professional setting.',
          translations: [
            {
              lang: 'en',
              text: 'In the next few years, I hope to develop my skills and gain more confidence in a professional setting.',
            },
            {
              lang: 'vi',
              text: 'Trong vài năm tới, tôi hy vọng phát triển kỹ năng và tự tin hơn trong môi trường chuyên nghiệp.',
            },
          ],
          words: [
            {
              text: 'In',
              start: 0.05,
              end: 0.11,
              score: 0.902,
            },
            {
              text: 'the',
              start: 0.13,
              end: 0.21,
              score: 0.829,
            },
            {
              text: 'next',
              start: 0.27,
              end: 0.43,
              score: 0.76,
            },
            {
              text: 'few',
              start: 0.51,
              end: 0.67,
              score: 0.989,
            },
            {
              text: 'years,',
              start: 0.711,
              end: 1.051,
              score: 0.681,
            },
            {
              text: 'I',
              start: 1.491,
              end: 1.532,
              score: 0.413,
            },
            {
              text: 'hope',
              start: 1.592,
              end: 1.752,
              score: 0.936,
            },
            {
              text: 'to',
              start: 1.792,
              end: 1.852,
              score: 0.997,
            },
            {
              text: 'develop',
              start: 1.912,
              end: 2.272,
              score: 0.754,
            },
            {
              text: 'my',
              start: 2.312,
              end: 2.413,
              score: 0.999,
            },
            {
              text: 'skills',
              start: 2.513,
              end: 2.873,
              score: 0.943,
            },
            {
              text: 'and',
              start: 2.913,
              end: 3.254,
              score: 0.807,
            },
            {
              text: 'gain',
              start: 3.314,
              end: 3.474,
              score: 0.894,
            },
            {
              text: 'more',
              start: 3.514,
              end: 3.674,
              score: 0.568,
            },
            {
              text: 'confidence',
              start: 3.754,
              end: 4.355,
              score: 0.966,
            },
            {
              text: 'in',
              start: 4.455,
              end: 4.515,
              score: 0.99,
            },
            {
              text: 'a',
              start: 4.555,
              end: 4.575,
              score: 0.998,
            },
            {
              text: 'professional',
              start: 4.635,
              end: 5.156,
              score: 0.865,
            },
            {
              text: 'setting.',
              start: 5.216,
              end: 5.536,
              score: 0.912,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-26.wav',
        },
        {
          id: 27,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 6.117,
          text: 'My goal is to take on more responsibilities and grow within the company, contributing in the best way possible.',
          translations: [
            {
              lang: 'en',
              text: 'My goal is to take on more responsibilities and grow within the company, contributing in the best way possible.',
            },
            {
              lang: 'vi',
              text: 'Mục tiêu của tôi là đảm nhận nhiều trách nhiệm hơn và phát triển trong công ty, đóng góp theo cách tốt nhất có thể.',
            },
          ],
          words: [
            {
              text: 'My',
              start: 0.05,
              end: 0.19,
              score: 0.998,
            },
            {
              text: 'goal',
              start: 0.25,
              end: 0.511,
              score: 0.894,
            },
            {
              text: 'is',
              start: 0.551,
              end: 0.791,
              score: 0.796,
            },
            {
              text: 'to',
              start: 0.851,
              end: 0.911,
              score: 0.73,
            },
            {
              text: 'take',
              start: 0.971,
              end: 1.151,
              score: 0.746,
            },
            {
              text: 'on',
              start: 1.271,
              end: 1.352,
              score: 0.93,
            },
            {
              text: 'more',
              start: 1.412,
              end: 1.572,
              score: 0.753,
            },
            {
              text: 'responsibilities',
              start: 1.632,
              end: 2.553,
              score: 0.791,
            },
            {
              text: 'and',
              start: 2.713,
              end: 2.773,
              score: 0.761,
            },
            {
              text: 'grow',
              start: 2.853,
              end: 3.034,
              score: 0.974,
            },
            {
              text: 'within',
              start: 3.094,
              end: 3.314,
              score: 0.917,
            },
            {
              text: 'the',
              start: 3.354,
              end: 3.414,
              score: 0.917,
            },
            {
              text: 'company,',
              start: 3.494,
              end: 3.915,
              score: 0.909,
            },
            {
              text: 'contributing',
              start: 4.235,
              end: 4.856,
              score: 0.838,
            },
            {
              text: 'in',
              start: 4.896,
              end: 5.056,
              score: 0.9,
            },
            {
              text: 'the',
              start: 5.096,
              end: 5.156,
              score: 0.593,
            },
            {
              text: 'best',
              start: 5.216,
              end: 5.416,
              score: 0.739,
            },
            {
              text: 'way',
              start: 5.477,
              end: 5.597,
              score: 0.926,
            },
            {
              text: 'possible.',
              start: 5.657,
              end: 6.117,
              score: 0.907,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/4-27.wav',
        },
      ],
      id: 4,
    },
    {
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-02.webp',
      order: 5,
      context:
        "That's a great mindset. Do you have any questions for me? Yes. What are the next steps in the hiring process? We'll review all candidates and get back to you soon. Sounds great. Thank you. Well, that's all. Thanks for your time, Laura. Thank you. I really appreciate the opportunity.",
      quizzes: [
        // {
        //   type: 'single_choice',
        //   question: 'What will happen next in the hiring process?',
        //   options: [
        //     'They will review candidates and get back soon',
        //     'Laura will start immediately',
        //     'They will schedule a technical test today',
        //   ],
        //   correctIndex: 0,
        // },
      ],
      segments: [
        {
          id: 0,
          isNarrator: true,
          character: {
            id: 999,
            name: 'Paw',
            speaker: 'en-US-Neural2-I',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/paw.svg',
          },
          start: 0.031,
          end: 5.485,
          text: 'As the interview comes to an end, Laura and the interviewer exchange final questions and thanks.',
          translations: [
            {
              lang: 'en',
              text: 'As the interview comes to an end, Laura and the interviewer exchange final questions and thanks.',
            },
            {
              lang: 'vi',
              text: 'Khi buổi phỏng vấn kết thúc, Laura và người phỏng vấn trao đổi những câu hỏi cuối cùng và lời cảm ơn.',
            },
          ],
          words: [
            {
              text: 'As',
              start: 0.031,
              end: 0.152,
              score: 0.598,
            },
            {
              text: 'the',
              start: 0.232,
              end: 0.313,
              score: 0.827,
            },
            {
              text: 'interview',
              start: 0.393,
              end: 0.776,
              score: 0.888,
            },
            {
              text: 'comes',
              start: 0.836,
              end: 1.017,
              score: 0.789,
            },
            {
              text: 'to',
              start: 1.078,
              end: 1.178,
              score: 0.97,
            },
            {
              text: 'an',
              start: 1.239,
              end: 1.279,
              score: 0.991,
            },
            {
              text: 'end,',
              start: 1.42,
              end: 1.54,
              score: 0.739,
            },
            {
              text: 'Laura',
              start: 1.923,
              end: 2.205,
              score: 0.77,
            },
            {
              text: 'and',
              start: 2.265,
              end: 2.345,
              score: 0.914,
            },
            {
              text: 'the',
              start: 2.386,
              end: 2.446,
              score: 0.967,
            },
            {
              text: 'interviewer',
              start: 2.527,
              end: 3.07,
              score: 0.849,
            },
            {
              text: 'exchange',
              start: 3.13,
              end: 3.593,
              score: 0.866,
            },
            {
              text: 'final',
              start: 3.654,
              end: 3.956,
              score: 0.876,
            },
            {
              text: 'questions',
              start: 4.036,
              end: 4.479,
              score: 0.882,
            },
            {
              text: 'and',
              start: 4.539,
              end: 4.62,
              score: 0.859,
            },
            {
              text: 'thanks.',
              start: 4.66,
              end: 5.485,
              score: 0.897,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-0.wav',
        },
        {
          id: 28,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.031,
          text: "That's a great mindset.",
          translations: [
            {
              lang: 'en',
              text: "That's a great mindset.",
            },
            {
              lang: 'vi',
              text: 'Tư duy đó thật tuyệt.',
            },
          ],
          words: [
            {
              text: "That's",
              start: 0.05,
              end: 0.23,
              score: 0.886,
            },
            {
              text: 'a',
              start: 0.27,
              end: 0.29,
              score: 0.978,
            },
            {
              text: 'great',
              start: 0.35,
              end: 0.53,
              score: 0.932,
            },
            {
              text: 'mindset.',
              start: 0.57,
              end: 1.031,
              score: 0.857,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-28.wav',
        },
        {
          id: 29,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 1.312,
          text: 'Do you have any questions for me?',
          translations: [
            {
              lang: 'en',
              text: 'Do you have any questions for me?',
            },
            {
              lang: 'vi',
              text: 'Bạn có câu hỏi nào cho tôi không?',
            },
          ],
          words: [
            {
              text: 'Do',
              start: 0.05,
              end: 0.111,
              score: 0.958,
            },
            {
              text: 'you',
              start: 0.131,
              end: 0.191,
              score: 0.874,
            },
            {
              text: 'have',
              start: 0.231,
              end: 0.311,
              score: 1,
            },
            {
              text: 'any',
              start: 0.351,
              end: 0.431,
              score: 0.938,
            },
            {
              text: 'questions',
              start: 0.471,
              end: 0.831,
              score: 0.64,
            },
            {
              text: 'for',
              start: 0.892,
              end: 1.012,
              score: 0.931,
            },
            {
              text: 'me?',
              start: 1.032,
              end: 1.312,
              score: 0.648,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-29.wav',
        },
        {
          id: 30,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 0.371,
          text: 'Yes.',
          translations: [
            {
              lang: 'en',
              text: 'Yes.',
            },
            {
              lang: 'vi',
              text: 'Có ạ.',
            },
          ],
          words: [
            {
              text: 'Yes.',
              start: 0.05,
              end: 0.371,
              score: 0.877,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-30.wav',
        },
        {
          id: 31,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 2.095,
          text: 'What are the next steps in the hiring process?',
          translations: [
            {
              lang: 'en',
              text: 'What are the next steps in the hiring process?',
            },
            {
              lang: 'vi',
              text: 'Các bước tiếp theo trong quy trình tuyển dụng là gì?',
            },
          ],
          words: [
            {
              text: 'What',
              start: 0.05,
              end: 0.17,
              score: 0.97,
            },
            {
              text: 'are',
              start: 0.19,
              end: 0.29,
              score: 0.844,
            },
            {
              text: 'the',
              start: 0.311,
              end: 0.391,
              score: 0.827,
            },
            {
              text: 'next',
              start: 0.411,
              end: 0.651,
              score: 0.812,
            },
            {
              text: 'steps',
              start: 0.692,
              end: 0.992,
              score: 0.759,
            },
            {
              text: 'in',
              start: 1.073,
              end: 1.133,
              score: 0.99,
            },
            {
              text: 'the',
              start: 1.153,
              end: 1.213,
              score: 0.993,
            },
            {
              text: 'hiring',
              start: 1.253,
              end: 1.554,
              score: 0.827,
            },
            {
              text: 'process?',
              start: 1.614,
              end: 2.095,
              score: 0.862,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-31.wav',
        },
        {
          id: 32,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 2.116,
          text: "We'll review all candidates and get back to you soon.",
          translations: [
            {
              lang: 'en',
              text: "We'll review all candidates and get back to you soon.",
            },
            {
              lang: 'vi',
              text: 'Chúng tôi sẽ xem xét tất cả ứng viên và sẽ phản hồi cho bạn sớm.',
            },
          ],
          words: [
            {
              text: "We'll",
              start: 0.05,
              end: 0.23,
              score: 0.889,
            },
            {
              text: 'review',
              start: 0.271,
              end: 0.531,
              score: 0.934,
            },
            {
              text: 'all',
              start: 0.551,
              end: 0.672,
              score: 0.835,
            },
            {
              text: 'candidates',
              start: 0.712,
              end: 1.133,
              score: 0.906,
            },
            {
              text: 'and',
              start: 1.173,
              end: 1.233,
              score: 0.999,
            },
            {
              text: 'get',
              start: 1.273,
              end: 1.354,
              score: 0.987,
            },
            {
              text: 'back',
              start: 1.414,
              end: 1.554,
              score: 0.984,
            },
            {
              text: 'to',
              start: 1.594,
              end: 1.674,
              score: 0.977,
            },
            {
              text: 'you',
              start: 1.694,
              end: 1.795,
              score: 0.64,
            },
            {
              text: 'soon.',
              start: 1.855,
              end: 2.116,
              score: 0.815,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-32.wav',
        },
        {
          id: 33,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 0.672,
          text: 'Sounds great.',
          translations: [
            {
              lang: 'en',
              text: 'Sounds great.',
            },
            {
              lang: 'vi',
              text: 'Nghe hay đấy.',
            },
          ],
          words: [
            {
              text: 'Sounds',
              start: 0.05,
              end: 0.291,
              score: 0.83,
            },
            {
              text: 'great.',
              start: 0.371,
              end: 0.672,
              score: 0.922,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-33.wav',
        },
        {
          id: 34,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 0.451,
          text: 'Thank you.',
          translations: [
            {
              lang: 'en',
              text: 'Thank you.',
            },
            {
              lang: 'vi',
              text: 'Cảm ơn bạn.',
            },
          ],
          words: [
            {
              text: 'Thank',
              start: 0.05,
              end: 0.27,
              score: 0.838,
            },
            {
              text: 'you.',
              start: 0.31,
              end: 0.451,
              score: 0.719,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-34.wav',
        },
        {
          id: 35,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 0.692,
          text: "Well, that's all.",
          translations: [
            {
              lang: 'en',
              text: "Well, that's all.",
            },
            {
              lang: 'vi',
              text: 'Vậy là hết.',
            },
          ],
          words: [
            {
              text: 'Well,',
              start: 0.05,
              end: 0.23,
              score: 0.877,
            },
            {
              text: "that's",
              start: 0.311,
              end: 0.511,
              score: 0.836,
            },
            {
              text: 'all.',
              start: 0.571,
              end: 0.692,
              score: 0.88,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-35.wav',
        },
        {
          id: 36,
          character: {
            id: 1,
            name: 'Interviewer',
            speaker: 'en-US-Neural2-D',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/john.svg',
          },
          start: 0.05,
          end: 0.993,
          text: 'Thanks for your time, Laura.',
          translations: [
            {
              lang: 'en',
              text: 'Thanks for your time, Laura.',
            },
            {
              lang: 'vi',
              text: 'Cảm ơn vì thời gian của bạn, Laura.',
            },
          ],
          words: [
            {
              text: 'Thanks',
              start: 0.05,
              end: 0.23,
              score: 0.964,
            },
            {
              text: 'for',
              start: 0.251,
              end: 0.351,
              score: 0.914,
            },
            {
              text: 'your',
              start: 0.371,
              end: 0.471,
              score: 0.868,
            },
            {
              text: 'time,',
              start: 0.511,
              end: 0.712,
              score: 0.995,
            },
            {
              text: 'Laura.',
              start: 0.732,
              end: 0.993,
              score: 0.908,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-36.wav',
        },
        {
          id: 37,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 0.511,
          text: 'Thank you.',
          translations: [
            {
              lang: 'en',
              text: 'Thank you.',
            },
            {
              lang: 'vi',
              text: 'Cảm ơn bạn.',
            },
          ],
          words: [
            {
              text: 'Thank',
              start: 0.05,
              end: 0.311,
              score: 0.833,
            },
            {
              text: 'you.',
              start: 0.351,
              end: 0.511,
              score: 0.868,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-37.wav',
        },
        {
          id: 38,
          character: {
            id: 2,
            name: 'Laura',
            speaker: 'en-US-Neural2-F',
            avatar:
              'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/character/tony.svg',
          },
          start: 0.05,
          end: 2.156,
          text: 'I really appreciate the opportunity.',
          translations: [
            {
              lang: 'en',
              text: 'I really appreciate the opportunity.',
            },
            {
              lang: 'vi',
              text: 'Tôi thực sự trân trọng cơ hội này.',
            },
          ],
          words: [
            {
              text: 'I',
              start: 0.05,
              end: 0.07,
              score: 1,
            },
            {
              text: 'really',
              start: 0.592,
              end: 0.792,
              score: 0.82,
            },
            {
              text: 'appreciate',
              start: 0.832,
              end: 1.294,
              score: 0.901,
            },
            {
              text: 'the',
              start: 1.314,
              end: 1.394,
              score: 0.602,
            },
            {
              text: 'opportunity.',
              start: 1.474,
              end: 2.156,
              score: 0.805,
            },
          ],
          source:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/5-38.wav',
        },
      ],
      id: 5,
    },
  ],
};

// function updateSegmentSources() {
//   const basePath = 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/audios/audio-test-1/';

//   return lessonDetailChunk.data.map((item) => ({
//     ...item,
//     segments: item.segments?.map((segment) => ({
//       ...segment,
//       source: `${basePath}${item.order}-${segment.id}.mp3`,
//     })),
//   }));
// }
// const updated = updateSegmentSources();
// fs.writeFileSync('./updated.json', JSON.stringify(updated, null, 2), 'utf-8');

// console.log('✅ File updated.json đã được tạo trong thư mục hiện tại!');
