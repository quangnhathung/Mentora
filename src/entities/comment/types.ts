export type Comment = {
  id: number;
  postId: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: number;
  text: string;
  score: number;
};

export type CommentSort = 'popular' | 'recent';

export type Paging<T> = { data: T[]; nextCursor?: number | null; count?: number };

export type CommentListResponse = Paging<Comment>;
