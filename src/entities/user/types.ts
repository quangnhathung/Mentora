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
  expiresAt: number;
};

export type UserStats = {
  streak: number;
  coins: number;
};

export type UserUpdateProfileRequest = User;
export type UserUpdateProfileResponse = {};
