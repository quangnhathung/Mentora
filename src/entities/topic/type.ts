export type TopicType = 'theory' | 'normal';
export type TopicDifficulty = 'Easy' | 'Medium' | 'Hard' | string;
export type LessonStatus = 'locked' | 'in_progress' | 'completed' | 'claimed' | 'coming_soon';

export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
};

export type Exercise = {
  id: string;
  title?: string;
  questions: Question[];
};

export type Lesson = {
  id: string;
  topicId: string;
  title: string;
  description?: string;

  status: LessonStatus;
  reward?: number;

  content: {
    passage: string;
    audioUrl?: string;
  };
  exercise?: Exercise;
  thumbnail?: string;
};

export type Topic = {
  id?: string;
  title: string;

  type: TopicType;

  difficulty: TopicDifficulty;
  progress: number;
  reward: number;
  image?: string;

  lessons: Lesson[];
};
