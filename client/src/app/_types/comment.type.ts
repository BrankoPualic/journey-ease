import { Country } from './shared.types';

export type Comment = {
  commentId: number;
  comment: string;
  commentDate: Date;
  edited: boolean;
  postId: number;
  user: CommentUser;
};

type CommentUser = {
  firstName: string;
  lastName: string;
  userImage: string;
  country: Country;
  commentCount: number;
};
