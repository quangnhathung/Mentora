import { type ChoiceBase } from '@/shared/ui/List/SelectableList';

export type Onboarding = {
  id: number;
  screenName: string;
  title: string;
  description: string;
  choices: ChoiceBase[];
};
