import { type Translation } from '@/shared/types';

// Main type
export type FindingSynonymQuizContent = {
  // Mảng các câu cần sửa lỗi
  questions: FindingSynonymQuizQuestion[];
};

// Support types
// Kiểu cho 1 câu cần sửa lỗi
export type FindingSynonymQuizQuestion = {
  id: number;

  // Câu bị split thành các từ có kèm id
  sentenceTexts: FindingSynonymQuizSentenceText[];

  synonyms: string[];

  // Gợi ý
  hint: Translation[];

  // id của từ sai
  correctAnswer: number;

  // Giải thích
  explanation: Translation[];
};

export type FindingSynonymQuizSentenceText = {
  id: number;
  text: string;
};
