export type Dialog = {
  id: number;
  characterId?: number;
  // characterSpeak: Character;
  // content: string;
  // segments?: Segment[];

  // others]au
  audio?: number;
  // audioGb?: string;
  // audioUs?: string;
};

export type DialogsResponse = { data: Dialog[] } & {
  offset: 1;
  limit: 10;
  count: 100;
};
