import { createAction, props } from '@ngrx/store';
import { BlogStatistics, Post } from '../../_types/post.types';
import { PaginatedResult } from '../../_types/pagination';

// BLOG
export const loadBlog = createAction(
  '[Blog] Load Blog',
  props<{
    page: number;
    itemsPerPage: number;
    column?: string;
    direction?: string;
  }>()
);

export const loadBlogSuccess = createAction(
  '[Blog] Blog Load Success',
  props<{ paginatedResult: PaginatedResult<Post[]> }>()
);

export const loadBlogFailure = createAction(
  '[Blog] Blog Load Failure',
  props<{ error: string }>()
);

export const loadSearchedBlog = createAction(
  '[Blog] Blog Search',
  props<{
    searchValue: string;
    page: number;
    itemsPerPage: number;
    column?: string;
    direction?: string;
  }>()
);

export const setSelectedCreator = createAction(
  '[Blog] Set Selected Creator',
  props<{ creator: string }>()
);

export const removeSelectedCreator = createAction(
  '[Blog] Remove Selected Creator'
);

// POST
export const loadPost = createAction(
  '[Post] Load Post',
  props<{ postId: number }>()
);

export const loadPostSuccess = createAction(
  '[Post] Post Load Success',
  props<{ post: Post }>()
);

export const loadPostFailure = createAction(
  '[Post] Post Load Failure',
  props<{ error: string }>()
);

export const removeSelectedPost = createAction('[Post] Post Selected Remove');

export const addPost = createAction(
  '[Admin Page] Add Post',
  props<{ post: FormData }>()
);

export const removePost = createAction(
  '[Admin Page] Remove Post',
  props<{ postId: number }>()
);

export const editPost = createAction(
  '[Admin Page] Edit Post',
  props<{ updatedPost: FormData }>()
);

export const saveBlogSuccess = createAction('[Admin Page] Save Blog Success');

export const saveBlogFailure = createAction(
  '[Admin Page] Save Blog Failure',
  props<{ error: string }>()
);

export const blogStatistics = createAction('[Admin Page] Blog Statistics');

export const loadBlogStatisticsSuccess = createAction(
  '[Admin Page] Blog Statistics Success',
  props<{ stats: BlogStatistics }>()
);

export const loadBlogStatisticsFailure = createAction(
  '[Admin Page] Blog Statistics Failure',
  props<{ error: string }>()
);
