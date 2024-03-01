import { createReducer, on } from '@ngrx/store';
import { Comment } from '../../_types/comment.type';
import { ITEMS_PER_PAGE, Pagination } from '../../_types/pagination';
import { UnionStatus } from '../../_types/shared.types';
import {
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  removeComment,
  saveCommentsFailure,
  saveCommentsSuccess,
  setPostForSelectedComments,
} from './comments.actions';

export type CommentsState = {
  comments: Comment[];
  pagination: Pagination;
  error: string | null;
  status: UnionStatus;
  orderingColumn: string | undefined;
  direction: string | undefined;
  postId: number;
};

export const initialState: CommentsState = {
  comments: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: 0,
    totalPages: 0,
  },
  error: null,
  status: 'pending',
  orderingColumn: 'CommentDate',
  direction: 'descending',
  postId: 0,
};

export const commentReducer = createReducer(
  initialState,

  on(
    loadComments,
    (state, { postId, page, itemsPerPage, column, direction }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: page,
        itemsPerPage,
      },
      orderingColumn: column,
      direction,
      postId,
      status: 'loading' as const,
    })
  ),

  on(loadCommentsSuccess, (state, { paginatedResult }) => {
    const updatedComments = paginatedResult.result
      ? [...paginatedResult.result]
      : state.comments;

    return {
      ...state,
      comments: updatedComments,
      pagination: paginatedResult.pagination || state.pagination,
      error: null,
      status: 'success' as const,
    };
  }),

  on(loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(removeComment, (state, { commentId }) => ({
    ...state,
    comments: [...state.comments.filter((x) => x.commentId !== commentId)],
    status: 'loading' as const,
  })),

  on(saveCommentsSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success' as const,
  })),

  on(saveCommentsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(setPostForSelectedComments, (state, { postId }) => ({
    ...state,
    postId,
    status: 'success' as const,
  }))
);
