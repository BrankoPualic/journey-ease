import { Country } from './shared.types';

export type Comment = {
  commentId: number;
  comment: string;
  commentDate: Date;
  edited: boolean;
  user: CommentUser;
};

type CommentUser = {
  id: number;
  firstName: string;
  lastName: string;
  userImage: string;
  country: Country;
  commentCount: number;
};
