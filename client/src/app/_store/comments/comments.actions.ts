import { createAction, props } from '@ngrx/store';
import { PaginatedResult } from '../../_types/pagination';
import { Comment } from '../../_types/comment.type';

export const loadComments = createAction(
  '[Admin Page] Load Comments',
  props<{
    postId: number;
    page: number;
    itemsPerPage: number;
    column?: string;
    direction?: string;
  }>()
);

export const loadCommentsSuccess = createAction(
  '[Admin Page] Comments Load Success',
  props<{ paginatedResult: PaginatedResult<Comment[]> }>()
);

export const loadCommentsFailure = createAction(
  '[Admin Page] Comments Load Failure',
  props<{ error: string }>()
);

export const removeComment = createAction(
  '[Admin Page] Delete Comment',
  props<{ commentId: number }>()
);

export const saveCommentsSuccess = createAction(
  '[Admin Page] Save Comments Success'
);

export const saveCommentsFailure = createAction(
  '[Admin Page] Save Comments Failure',
  props<{ error: string }>()
);

export const setPostForSelectedComments = createAction(
  '[Admin Page] Set Post',
  props<{ postId: number }>()
);
