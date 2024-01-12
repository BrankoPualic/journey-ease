import { createReducer, on } from '@ngrx/store';
import { Country, UnionStatus } from '../../_types/shared.types';
import {
  loadCountries,
  loadCountriesFailure,
  loadCountriesSuccess,
} from './countries.actions';

export type CountryState = {
  countries: Country[];
  error: string | null;
  status: UnionStatus;
};

export const initialState: CountryState = {
  countries: [],
  error: null,
  status: 'pending',
};

export const countryReducer = createReducer(
  initialState,

  on(loadCountries, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    error: null,
    status: 'success' as const,
  })),

  on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
