import { type Translation } from '@/shared/types';

import { type Character } from '../character/types';

export type Word = {
  text: string;
  start: number;
  end: number;
  score: number;
  isBlank?: boolean;
};

export type Audio = {
  id: number;
  character: Character;
  start: number;
  end: number;
  text: string;
  isNarrator?: boolean;
  translations: Translation[];
  words: Word[];
  source: string;
};
