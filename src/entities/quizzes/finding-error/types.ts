import { type Translation } from '@/shared/types';

// Main type
export type FindingErrorsQuizContent = {
  // Mảng các câu cần sửa lỗi
  questions: FindingErrorsQuizQuestion[];
};

// Support types
// Kiểu cho 1 câu cần sửa lỗi
export type FindingErrorsQuizQuestion = {
  id: number;

  // Câu bị split thành các từ có kèm id
  sentenceTexts: FindingErrorsQuizSentenceText[];

  // Gợi ý
  hint: Translation[];

  // id của từ sai
  correctAnswer: number;

  // Giải thích
  explanation: Translation[];
};

export type FindingErrorsQuizSentenceText = {
  id: number;
  text: string;
};
