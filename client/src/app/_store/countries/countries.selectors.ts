import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCountries = (state: AppState) => state.countries;

export const selectAllCountries = createSelector(selectCountries, (state) =>
  state.countries.slice().reverse()
);
