export type User = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  dob?: string;
  streak: UserStats;
};

export type UserStats = {
  streak: number;
  coins: number;
};
