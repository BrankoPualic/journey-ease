import { createReducer, on } from '@ngrx/store';
import { Season, UnionStatus } from '../../_types/shared.types';
import {
  loadSeasons,
  loadSeasonsFailure,
  loadSeasonsSuccess,
} from './destinations.actions';

export type SeasonState = {
  seasons: Season[];
  error: string | null;
  status: UnionStatus;
};

export const initialState: SeasonState = {
  seasons: [],
  error: null,
  status: 'pending',
};

export const seasonReducer = createReducer(
  initialState,

  on(loadSeasons, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadSeasonsSuccess, (state, { seasons }) => ({
    ...state,
    seasons,
    error: null,
    status: 'success' as const,
  })),

  on(loadSeasonsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
