import { type Lesson, type Topic, type TopicType } from '@/entities/topic/type';

const generateMockLessons = (
  topicId: string,
  topicTitle: string,
  topicType: TopicType
): Lesson[] => {
  const isTheory = topicType === 'theory';

  return [
    {
      id: `${topicId}_l1`,
      topicId: topicId,
      title: `Introduction to ${topicTitle}`,
      description: `Basic concepts about ${topicTitle}.`,
      status: 'completed',
      content: {
        passage: `Traveling is an enriching experience that allows us to explore new places, cultures, and ways of life. It broadens our horizons and helps us gain a deeper understanding of the world we live in. Whether it's visiting historical landmarks, relaxing on beautiful beaches, or immersing ourselves in vibrant cities, travel offers a multitude of opportunities for personal growth and discovery.\n
One of the benefits of traveling is the chance to encounter different languages. Being exposed to new languages enhances our linguistic skills and cultural awareness. It allows us to communicate with locals and better understand their way of life. Even learning a few basic phrases in the local language can go a long way in making connections and showing respect to the people of the country we are visiting. \n
Furthermore, traveling fosters tolerance and empathy by exposing us to diverse perspectives and lifestyles. It helps break down stereotypes and promotes acceptance and understanding. Through interaction with people from different backgrounds, we learn to appreciate and embrace differences, ultimately becoming more open-minded individuals. \n
Traveling also offers opportunities to taste new cuisines, which is an exciting aspect of exploring different cultures. Trying local dishes and delicacies can be a gastronomic adventure, and it allows us to appreciate the diversity of flavors and culinary traditions worldwide. From spicy street food to elegant gourmet experiences, food becomes a gateway to understanding the cultural heritage of a place.  `,
      },
      exercise: isTheory
        ? undefined
        : {
            id: `${topicId}_ex1`,
            title: 'Review Question',
            questions: [
              {
                id: 'q1',
                text: `According to the passage, what is the main benefit of traveling?`,
                options: [
                  { id: 'opt1', text: 'Earning a lot of money' },
                  { id: 'opt2', text: 'Learning a new language fluently' },
                  { id: 'opt3', text: 'Staying within your comfort zone' },
                  { id: 'opt4', text: 'Enriching experiences and personal growth' },
                ],
                correctOptionId: 'opt1',
              },
              {
                id: 'q2',
                text: `According to the passage, what is the main benefit of traveling?`,
                options: [
                  { id: 'opt1', text: 'Earning a lot of money' },
                  { id: 'opt2', text: 'Learning a new language fluently' },
                  { id: 'opt3', text: 'Staying within your comfort zone' },
                  { id: 'opt4', text: 'Enriching experiences and personal growth' },
                ],
                correctOptionId: 'opt1',
              },
              {
                id: 'q3',
                text: `According to the passage, what is the main benefit of traveling?`,
                options: [
                  { id: 'opt1', text: 'Earning a lot of money' },
                  { id: 'opt2', text: 'Learning a new language fluently' },
                  { id: 'opt3', text: 'Staying within your comfort zone' },
                  { id: 'opt4', text: 'Enriching experiences and personal growth' },
                ],
                correctOptionId: 'opt1',
              },
            ],
          },
    },
    {
      id: `${topicId}_l2`,
      topicId: topicId,
      title: `Common Vocabulary`,
      description: `Essential words used in ${topicTitle}.`,
      status: 'in_progress',
      reward: 5,
      content: {
        passage: `<p>Here are some common words...</p>`,
      },
      exercise: isTheory
        ? undefined
        : {
            id: `${topicId}_ex2`,
            title: 'Vocabulary Check',
            questions: [],
          },
      thumbnail:
        'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    },
    {
      id: `${topicId}_l3`,
      topicId: topicId,
      title: `Advanced Topics`,
      description: `Deep dive into ${topicTitle}.`,
      status: 'locked',
      content: { passage: '...' },
    },
  ];
};

// --- MAIN DATA: Mock Topics ---

export const mockTopics: Topic[] = [
  {
    id: 't1',
    title: 'Transport',
    type: 'normal',
    difficulty: 'Hard',
    progress: 10,
    reward: 30,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t1', 'Transport', 'normal'),
  },
  {
    // --- T2: TRAVEL (Dữ liệu chi tiết theo UI Design) ---
    id: 't2',
    title: 'Travel',
    type: 'normal',
    difficulty: 'Easy',
    progress: 80,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: [
      {
        id: 'l_airport',
        topicId: 't2',
        title: 'At the Airport',
        description: 'Learn check-in, boarding, and customs English.',
        status: 'claimed', // Đã xong và nhận quà (Vàng)
        content: {
          passage: `<h3>At the Airport</h3><p>Traveling is an enriching experience...</p>`,
        },
        exercise: {
          id: 'ex_airport',
          title: 'Airport Check',
          questions: [
            {
              id: 'q1',
              text: 'Where do you go to get your boarding pass?',
              options: [
                { id: 'a', text: 'Check-in counter' },
                { id: 'b', text: 'Restroom' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      },
      {
        id: 'l_directions',
        topicId: 't2',
        title: 'Asking for Directions',
        description: 'Practice asking & understanding directions.',
        status: 'in_progress',
        content: {
          passage: `<h3>Excuse me, where is...?</h3><p>Getting lost is part of the fun...</p>`,
        },
        exercise: {
          id: 'ex_directions',
          title: 'Directions Practice',
          questions: [],
        },
      },
      {
        id: 'l_food',
        topicId: 't2',
        title: 'Ordering Food',
        description: 'Useful phrases in restaurants and cafes.',
        status: 'locked',
        content: { passage: '' },
      },
      {
        id: 'l_hotel',
        topicId: 't2',
        title: 'Hotel Booking',
        description: 'How to book rooms and check-in politely.',
        status: 'locked',
        content: { passage: '' },
      },
    ],
  },
  {
    id: 't3',
    title: 'Food & Drinks',
    type: 'normal',
    difficulty: 'Medium',
    progress: 55,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t3', 'Food & Drinks', 'normal'),
  },
  {
    id: 't4',
    title: 'Shopping',
    type: 'normal',
    difficulty: 'Medium',
    progress: 30,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t4', 'Shopping', 'normal'),
  },
  {
    id: 't5',
    title: 'Daily Life',
    type: 'normal',
    difficulty: 'Easy',
    progress: 5,
    reward: 5,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t5', 'Daily Life', 'normal'),
  },
  {
    id: 't6',
    title: 'Health',
    type: 'normal',
    difficulty: 'Medium',
    progress: 45,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t6', 'Health', 'normal'),
  },
  {
    id: 't7',
    title: 'Fitness',
    type: 'normal',
    difficulty: 'Hard',
    progress: 60,
    reward: 35,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t7', 'Fitness', 'normal'),
  },
  {
    id: 't8',
    title: 'Education',
    type: 'theory',
    difficulty: 'Easy',
    progress: 20,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t8', 'Education', 'theory'),
  },
  {
    id: 't9',
    title: 'Entertainment',
    type: 'normal',
    difficulty: 'Medium',
    progress: 35,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t9', 'Entertainment', 'normal'),
  },
  {
    id: 't10',
    title: 'Technology',
    type: 'normal',
    difficulty: 'Hard',
    progress: 70,
    reward: 40,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t10', 'Technology', 'normal'),
  },
  {
    id: 't11',
    title: 'Science',
    type: 'theory', // Science thiên về đọc hiểu
    difficulty: 'Medium',
    progress: 50,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t11', 'Science', 'theory'),
  },
  {
    id: 't12',
    title: 'Music',
    type: 'normal',
    difficulty: 'Easy',
    progress: 15,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t12', 'Music', 'normal'),
  },
  {
    id: 't13',
    title: 'Movies',
    type: 'normal',
    difficulty: 'Medium',
    progress: 40,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t13', 'Movies', 'normal'),
  },
  {
    id: 't14',
    title: 'Gaming',
    type: 'normal',
    difficulty: 'Hard',
    progress: 65,
    reward: 35,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t14', 'Gaming', 'normal'),
  },
  {
    id: 't15',
    title: 'Art',
    type: 'theory', // Art thiên về lý thuyết/ngắm tranh
    difficulty: 'Easy',
    progress: 25,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t15', 'Art', 'theory'),
  },
  {
    id: 't16',
    title: 'Photography',
    type: 'normal',
    difficulty: 'Medium',
    progress: 30,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t16', 'Photography', 'normal'),
  },
  {
    id: 't17',
    title: 'Fashion',
    type: 'normal',
    difficulty: 'Easy',
    progress: 10,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t17', 'Fashion', 'normal'),
  },
  {
    id: 't18',
    title: 'Travel Tips',
    type: 'normal',
    difficulty: 'Medium',
    progress: 55,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t18', 'Travel Tips', 'normal'),
  },
  {
    id: 't19',
    title: 'Books',
    type: 'theory',
    difficulty: 'Easy',
    progress: 20,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t19', 'Books', 'theory'),
  },
  {
    id: 't20',
    title: 'History',
    type: 'theory',
    difficulty: 'Medium',
    progress: 35,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t20', 'History', 'theory'),
  },
  {
    id: 't21',
    title: 'Geography',
    type: 'normal',
    difficulty: 'Hard',
    progress: 60,
    reward: 35,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t21', 'Geography', 'normal'),
  },
  {
    id: 't22',
    title: 'Languages',
    type: 'normal',
    difficulty: 'Easy',
    progress: 15,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t22', 'Languages', 'normal'),
  },
  {
    id: 't23',
    title: 'Culture',
    type: 'theory',
    difficulty: 'Medium',
    progress: 40,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t23', 'Culture', 'theory'),
  },
  {
    id: 't24',
    title: 'Nature',
    type: 'normal',
    difficulty: 'Easy',
    progress: 25,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t24', 'Nature', 'normal'),
  },
  {
    id: 't25',
    title: 'Pets',
    type: 'normal',
    difficulty: 'Medium',
    progress: 50,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
    lessons: generateMockLessons('t25', 'Pets', 'normal'),
  },
];
