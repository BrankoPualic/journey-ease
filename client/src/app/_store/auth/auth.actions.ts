import { createAction, props } from '@ngrx/store';
import {
  UserAuthorized,
  UserSigninCred,
  UserSignupCred,
} from '../../_types/auth.types';

export const signup = createAction(
  '[Auth] Signup',
  props<{ userSignup: UserSignupCred }>()
);

export const signin = createAction(
  '[Auth] Signin',
  props<{ userSignin: UserSigninCred }>()
);

export const authorizationSuccess = createAction(
  '[Auth] Authorization Success',
  props<{ user: UserAuthorized }>()
);

export const authorizationFailure = createAction(
  '[Auth] Authorization Failure',
  props<{ error: string }>()
);
