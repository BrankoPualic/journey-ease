import { createAction, props } from '@ngrx/store';
import { Season } from '../../_types/shared.types';

// LOAD SEASONS
export const loadSeasons = createAction('[Home Page] Load Countries');

export const loadSeasonsSuccess = createAction(
  '[Home Page] Seasons Load Success',
  props<{ seasons: Season[] }>()
);

export const loadSeasonsFailure = createAction(
  '[Home Page] Seasons Load Failure',
  props<{ error: string }>()
);
