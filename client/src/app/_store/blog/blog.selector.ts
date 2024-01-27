import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectBlog = (state: AppState) => state.blog;
export const selectAllBlog = createSelector(selectBlog, (state) => state.blog);
