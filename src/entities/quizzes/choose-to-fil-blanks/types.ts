import { type Translation } from '@/shared/types';

// Main type
export type ChooseToFillTheBlanksQuizContent = {
  // Mảng các câu cần sửa lỗi
  questions: ChooseToFillTheBlanksQuizQuestion[];
  wordList: ChooseToFillTheBlanksQuizWord[];
};

// Support types
// Kiểu cho 1 câu cần fill
export type ChooseToFillTheBlanksQuizQuestion = {
  id: number;

  // Câu cần fill lưu dưới dạng từng từ, flag isBlank xác định có phải là blank không ?
  sentenceTexts: ChooseToFillTheBlanksQuizWord[];

  // Đáp án đúng (id của ChooseToFillTheBlanksQuizWord)
  correctWord: number;

  // Gợi ý
  hint: Translation[];

  // Giải thích
  explanation: Translation[];
};

export type ChooseToFillTheBlanksQuizWord = {
  id: number;
  text: string;
  isBlank?: boolean;
};
