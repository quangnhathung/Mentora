import { type Language } from '@/shared/lib/i18n/resources';
import { type Translation } from '@/shared/types';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';

// support type
export type TrueFalseQuizQuestion = {
  id: number;
  content: Translation[];
  isTrue: boolean;
  sentence: string;
};

// main type
export type TrueFalseQuizContent = {
  questions: TrueFalseQuizQuestion[];
};

// choice type
export type TrueFalseQuizChoice = ChoiceBase &
  TrueFalseQuizQuestion & { nativeDescription: string; audioSource: string };

export const convertAnswersToTrueFalseQuizChoices = (
  answers: TrueFalseQuizQuestion[],
  nativeLang: Language,
  learningLang: Language
): TrueFalseQuizChoice[] => {
  return answers.map((question) => {
    const learningDescription = question.content.find((item) => item.lang === learningLang)?.text!;
    const nativeDescription = question.content.find((item) => item.lang === nativeLang)?.text!;
    const audioSource = question.content.find((item) => item.lang === learningLang)?.audio!;

    return {
      ...question,
      value: learningDescription,
      description: learningDescription,
      nativeDescription,
      audioSource,
    };
  });
};
