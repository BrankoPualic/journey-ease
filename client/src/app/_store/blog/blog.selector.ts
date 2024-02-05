import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectBlog = (state: AppState) => state.blog;
export const selectAllBlog = createSelector(selectBlog, (state) => state.blog);
export const selectBlogState = createSelector(selectBlog, (state) => state);

export const selectPost = createSelector(selectBlog, (state) => state.post);

export const selectSelectedCreator = createSelector(
  selectBlog,
  (state) => state.selectedCreator
);

export const selectCurrentPage = createSelector(
  selectBlog,
  (state) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectBlog,
  (state) => state.totalPages
);
