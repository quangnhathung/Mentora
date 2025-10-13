import { type User } from '@/entities/user/types';

export type Period = 'weekly' | 'monthly' | 'all';

export type RankUser = {
  id: number;
  user: User;
  level: number; // Beginner/Intermediate...
  score: number; // KN
  rank: number; // 1..N
};

export type Leaderboard = {
  period: Period;
  top3: RankUser[]; // length <= 3
  rest: RankUser[]; // 4..N
};

export type LeaderboardActionResponse = {};
export type LeaderboardResponse = { data: Leaderboard };
