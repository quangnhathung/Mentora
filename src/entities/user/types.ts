export type User = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  dob?: string;
  premium?: Premium;
};

export type Premium = {
  isActive: boolean;
  expiresAt: number; // Unix timestamp
};

export type UserStats = {
  streak: number;
  coins: number;
};

export type UserLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'master';

export type UserProgress = {
  currentHealth?: number;
  currentLevel: UserLevel;
  currentLevelNumber: number;
  currentLevelProgress: number;
  currentLevelMaxExp: number;
  currentLevelExp: number;
  currentPathProgress: number;
};

export type UserResponse = User & {
  stats: UserStats;
  progress: UserProgress;
};

export type UserProgressResponse = UserProgress;

export type UserUpdateProfileRequest = User;
export type UserUpdateProfileResponse = {};

export type Content = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type PathProgress = {
  id: number;
  title: string;
  description: string;
  status: number;
  content: Content[];
};

export type PathProgressResponse = {
  offset: number;
  limit: number;
  count: number;
  data: PathProgress[];
};
