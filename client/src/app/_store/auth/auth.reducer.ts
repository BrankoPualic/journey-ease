import { createReducer, on } from '@ngrx/store';
import { UserAuthorized } from '../../_types/auth.types';
import { UnionStatus } from '../../_types/shared.types';
import {
  authorizationFailure,
  authorizationSuccess,
  signin,
  signup,
} from './auth.actions';

export type AuthState = {
  error: string | null;
  status: UnionStatus;
};

export const initialState: AuthState = {
  error: null,
  status: 'pending',
};

export const authReducer = createReducer(
  initialState,

  on(signup, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(signin, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(authorizationSuccess, (state) => ({
    ...state,
    status: 'success' as const,
  })),

  on(authorizationFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
