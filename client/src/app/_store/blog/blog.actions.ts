import { createAction, props } from '@ngrx/store';
import { Post } from '../../_types/post.type';

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
