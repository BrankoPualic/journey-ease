import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectSeasons = (state: AppState) => state.seasons;

export const selectAllSeasons = createSelector(
  selectSeasons,
  (state) => state.seasons
);
