import { type User } from '@/entities/user/types';

export type PostFilter = 'feed' | 'saved' | 'news' | 'reward';
export type PostExtraType = 'star' | 'xp';

export type PostExtra = {
  id: number;
  value: number;
  type: PostExtraType;
};

export type Post = {
  id: number;
  author?: User;
  title?: string;
  content?: string;
  createdAt?: number; // ISO
  likes?: number;
  shares?: number;
  comments?: number;
  credits?: number;
  isSave?: boolean;
  extras?: PostExtra[]; // ví dụ: ['5⭐']
  tags?: string[]; // ví dụ: ['5⭐']
  highlight?: boolean;
};

export type Paging<T> = { data: T[]; nextCursor?: number | null; count?: number };

export type PostActionResponse = {};
export type PostResponse = { data: Post };

export type PostListResponse = Paging<Post>;
