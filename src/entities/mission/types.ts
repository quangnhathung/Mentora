export type Misson = {
  id?: string;

  title: string;

  current: number;

  target: number;

  reward: number;
};

export type DailyCheckinType = {
  id: string;
  isMiss?: boolean;
  isChecked?: boolean;
};
