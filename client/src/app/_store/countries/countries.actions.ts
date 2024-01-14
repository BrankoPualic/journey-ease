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
  '[Countries] Add Country',
  props<{ countryName: string }>()
);

// SAVING
export const saveCountriesSuccess = createAction(
  '[Countries] Save Countries Success'
);

export const saveCountriesFailure = createAction(
  '[Countries] Save Coutnries Failure',
  props<{ error: string }>()
);
