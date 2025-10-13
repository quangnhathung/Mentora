export type Option = {
  id: string;
  text: string;
  correct?: boolean;
};

export type Quest = {
  id: string;
  image?: string;
  text?: string;
  options: Option[];
};

export type WordGuessTopic = {
  id: string;
  name: string;
  quests: Quest[];
};
