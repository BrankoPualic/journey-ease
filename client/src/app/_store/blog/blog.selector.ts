import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectBlog = (state: AppState) => state.blog;
export const selectAllBlog = createSelector(selectBlog, (state) => state.blog); // Mozda je ovo nepotrebno zbog gore selectBlog-a
export const selectBlogState = createSelector(selectBlog, (state) => state);

export const selectPost = createSelector(selectBlog, (state) => state.post);

export const selectSelectedCreator = createSelector(
  selectBlog,
  (state) => state.selectedCreator
);

export const selectBlogStats = createSelector(
  selectBlog,
  (state) => state.adminPageStats
);
