export type vocab = {
  id: string;
  vocabulary: string;
};

export type VocabTopic = {
  id: string;
  text?: string;
  options: vocab[];
};
