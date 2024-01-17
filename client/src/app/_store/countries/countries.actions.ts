import { createAction, props } from '@ngrx/store';
import { Country } from '../../_types/shared.types';

// LOAD
export const loadCountries = createAction('[Countries] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Countries] Countries Load Success',
  props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries] Countries Load Failure',
  props<{ error: string }>()
);

// INSERT
export const addCountry = createAction(
  '[Admin Page] Add Country',
  props<{ countryName: string }>()
);

// DELETE
export const removeCountry = createAction(
  '[Admin Page] Remove Country',
  props<{ countryId: number }>()
);

// EDIT
export const editCountry = createAction(
  '[Admin Page] Edit Country',
  props<{ content: Country }>()
);

// SAVING
export const saveCountriesSuccess = createAction(
  '[Admin Page] Save Countries Success'
);

export const saveCountriesFailure = createAction(
  '[Admin Page] Save Countries Failure',
  props<{ error: string }>()
);
