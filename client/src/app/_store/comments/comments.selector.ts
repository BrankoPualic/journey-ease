import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectComments = (state: AppState) => state.comments;
export const selectCommentsState = createSelector(
  selectComments,
  (state) => state
);

export const selectCommentsPost = createSelector(
  selectComments,
  (state) => state.postId
);
