import { createReducer, on } from '@ngrx/store';
import { Post } from '../../_types/post.types';
import { UnionStatus } from '../../_types/shared.types';
import {
  addPost,
  editPost,
  loadBlog,
  loadBlogSuccess,
  loadPost,
  loadPostFailure,
  loadPostSuccess,
  loadSearchedBlog,
  removePost,
  removeSelectedCreator,
  removeSelectedPost,
  saveBlogFailure,
  saveBlogSuccess,
  setCurrentPage,
  setSelectedCreator,
} from './blog.actions';
import { loadCountriesFailure } from '../countries/countries.actions';

export type BlogState = {
  blog: Post[];
  currentPage: number;
  totalPages: number;
  post: Post | null;
  selectedCreator: string | null;
  error: string | null;
  status: UnionStatus;
};

export const initialState: BlogState = {
  blog: [],
  currentPage: 1,
  totalPages: 1,
  post: null,
  selectedCreator: null,
  error: null,
  status: 'pending',
};

export const blogReducer = createReducer(
  initialState,

  on(loadBlog, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadBlogSuccess, (state, { response }) => ({
    ...state,
    blog: response.blog,
    totalPages: response.totalPages,
    error: null,
    status: 'success' as const,
  })),

  on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(setCurrentPage, (state, { currentPage }) => ({
    ...state,
    currentPage,
  })),

  on(loadSearchedBlog, (state, { searchValue }) => ({
    ...state,
    blog: [
      ...state.blog.filter((blog) => blog.postTitle.includes(searchValue)),
    ],
  })),

  on(setSelectedCreator, (state, { creator }) => ({
    ...state,
    selectedCreator: creator,
  })),

  on(removeSelectedCreator, (state) => ({
    ...state,
    selectedCreator: null,
  })),

  on(removeSelectedPost, (state) => ({
    ...state,
    post: null,
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
  })),

  on(loadPost, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadPostSuccess, (state, { post }) => ({
    ...state,
    post,
    error: null,
    status: 'success' as const,
  })),

  on(loadPostFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
