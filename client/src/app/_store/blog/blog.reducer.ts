import { createReducer, on } from '@ngrx/store';
import { BlogStatistics, Post } from '../../_types/post.types';
import { UnionStatus } from '../../_types/shared.types';
import {
  addPost,
  blogStatistics,
  editPost,
  loadBlog,
  loadBlogStatisticsFailure,
  loadBlogStatisticsSuccess,
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
import { ITEMS_PER_PAGE, Pagination } from '../../_types/pagination';

export type BlogState = {
  blog: Post[];
  pagination: Pagination;
  post: Post | null;
  selectedCreator: string | null;
  error: string | null;
  status: UnionStatus;
  adminPageStats: BlogStatistics;
};

export const initialState: BlogState = {
  blog: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: 0,
    totalPages: 0,
  },
  post: null,
  selectedCreator: null,
  error: null,
  status: 'pending',
  adminPageStats: {
    totalBlog: 0,
    totalAuthors: 0,
    topAuthor: '',
    totalComments: 0,
  },
};

export const blogReducer = createReducer(
  initialState,

  on(loadBlog, (state, { page, itemsPerPage }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: page,
      itemsPerPage,
    },
    status: 'loading' as const,
  })),

  on(loadBlogSuccess, (state, { paginatedResult }) => {
    const updatedBlog = paginatedResult.result
      ? [...paginatedResult.result]
      : state.blog;

    return {
      ...state,
      blog: updatedBlog,
      pagination: paginatedResult.pagination || state.pagination,
      error: null,
      status: 'success' as const,
    };
  }),

  on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(loadSearchedBlog, (state, { searchValue, page, itemsPerPage }) => ({
    ...state,
    blog: [
      ...state.blog.filter((blog) => blog.postTitle.includes(searchValue)),
    ],
    pagination: {
      ...state.pagination,
      currentPage: page,
      itemsPerPage,
    },
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
  })),

  on(blogStatistics, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadBlogStatisticsSuccess, (state, { stats }) => ({
    ...state,
    adminPageStats: stats || state.adminPageStats,
    error: null,
    status: 'success' as const,
  })),

  on(loadBlogStatisticsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
