import { type ChooseToFillTheBlanksQuizContent } from './choose-to-fil-blanks/types';
import { type QuizType } from './enum';
import { type FindingErrorsQuizContent } from './finding-error/types';
import { type FindingSynonymQuizContent } from './finding-synonym/types';
import { type SingleChoiceQuizContent } from './single-choice/types';
import { type TrueFalseQuizContent } from './true-false/types';

export type BaseQuiz = {
  id: number;
  type: QuizType;
  instruction?: string;
  quizHints?: string[];
};

export type Quiz = BaseQuiz & {
  content:
    | SingleChoiceQuizContent
    | TrueFalseQuizContent
    | FindingErrorsQuizContent
    | FindingSynonymQuizContent
    | ChooseToFillTheBlanksQuizContent;
};

// Màu khi style các trạng thái của câu trả lời
// NOTE: chưa có gợi ý class
export type ChoiceColorsByStatus = {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
};
