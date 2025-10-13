import { type Language } from '@/shared/lib/i18n/resources';
import { type Translation } from '@/shared/types';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';

// support type
export type SingleChoiceQuizAnswer = {
  id: number;
  content: Translation[];
};

// Main type
export type SingleChoiceQuizContent = {
  answers: SingleChoiceQuizAnswer[];
  correctAnswer: number;
};

// Choice type
export type SingleChoiceQuiz_Choice = ChoiceBase & {
  nativeDescription: string;
  audioSource: string;
};

// Response
export type SingleChoiceQuizResponse = { data: SingleChoiceQuizContent };
export type SingleChoiceQuizListResponse = { data: SingleChoiceQuizContent[] } & {
  offset: 1;
  limit: 10;
  count: 100;
};

export const convertAnswersToSingleQuizChoices = (
  answers: SingleChoiceQuizAnswer[],
  nativeLang: Language,
  learningLang: Language
): SingleChoiceQuiz_Choice[] => {
  return answers.map((answer) => {
    const learningDescription = answer.content.find((item) => item.lang === learningLang)?.text!;
    const nativeDescription = answer.content.find((item) => item.lang === nativeLang)?.text!;
    const audioSource = answer.content.find((item) => item.lang === learningLang)?.audio!;

    return {
      id: answer.id,
      value: learningDescription,
      description: learningDescription,
      nativeDescription,
      audioSource,
    };
  });
};
