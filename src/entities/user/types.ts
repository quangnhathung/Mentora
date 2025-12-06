export type User = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  dob?: string;
  streak: number;
  coins: number;
};

export type Premium = {
  isActive?: boolean;
  expires_at?: string;
};

export type PremiumResponse = {
  id: number;
  user_id: number;
  expires_at: string;
};
