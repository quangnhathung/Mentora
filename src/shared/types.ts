import { type BaseChoiceStatus } from './enum';

export type Translation = {
  lang: string;
  text: string;
  audio?: string;
};

// NOTE: chưa biết để đâu
export type BaseQuizChoiceStatus = BaseChoiceStatus;
