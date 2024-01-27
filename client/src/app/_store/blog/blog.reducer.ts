import { createReducer, on } from '@ngrx/store';
import { Post } from '../../_types/post.type';
import { UnionStatus } from '../../_types/shared.types';
import {
  addPost,
  editPost,
  loadBlog,
  loadBlogSuccess,
  loadSearchedBlog,
  removePost,
  saveBlogFailure,
  saveBlogSuccess,
} from './blog.actions';
import { loadCountriesFailure } from '../countries/countries.actions';

export type BlogState = {
  blog: Post[];
  error: string | null;
  status: UnionStatus;
};

export const initialState: BlogState = {
  blog: [],
  error: null,
  status: 'pending',
};

export const blogReducer = createReducer(
  initialState,

  on(loadBlog, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadBlogSuccess, (state, { blog }) => ({
    ...state,
    blog,
    error: null,
    status: 'success' as const,
  })),

  on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(loadSearchedBlog, (state, { searchValue }) => ({
    ...state,
    blog: [
      ...state.blog.filter((blog) => blog.postTitle.includes(searchValue)),
    ],
  })),

  on(addPost, (state, { post }) => ({
    ...state,
    blog: [...state.blog, post],
  })),

  on(saveBlogSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success' as const,
  })),

  on(saveBlogFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(removePost, (state, { postId }) => ({
    ...state,
    blog: [...state.blog.filter((x) => x.postId !== postId)],
  })),

  on(editPost, (state, { updatedPost }) => ({
    ...state,
    blog: state.blog.map((post) =>
      post.postId === updatedPost.postId ? updatedPost : post
    ),
  }))
);
