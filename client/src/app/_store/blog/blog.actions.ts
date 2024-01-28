import { createAction, props } from '@ngrx/store';
import { Post } from '../../_types/post.type';

// BLOG
export const loadBlog = createAction('[Blog] Load Blog');

export const loadBlogSuccess = createAction(
  '[Blog] Blog Load Success',
  props<{ blog: Post[] }>()
);

export const loadBlogFailure = createAction(
  '[Blog] Blog Load Failure',
  props<{ error: string }>()
);

export const loadSearchedBlog = createAction(
  '[Blog] Blog Search',
  props<{ searchValue: string }>()
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
  props<{ post: Post }>()
);

export const removePost = createAction(
  '[Admin Page] Remove Post',
  props<{ postId: number }>()
);

export const editPost = createAction(
  '[Admin Page] Edit Post',
  props<{ updatedPost: Post }>()
);

export const saveBlogSuccess = createAction('[Admin Page] Save Blog Success');

export const saveBlogFailure = createAction(
  '[Admin Page] Save Blog Failure',
  props<{ error: string }>()
);
