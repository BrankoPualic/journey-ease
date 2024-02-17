import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../_services/auth.service';
import {
  authorizationFailure,
  authorizationSuccess,
  signin,
  signup,
} from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap((action) =>
        this.authService.signup(action.userSignup).pipe(
          map((user) => authorizationSuccess({ user })),
          catchError((error) => of(authorizationFailure({ error })))
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signin),
      switchMap((action) =>
        this.authService.signin(action.userSignin).pipe(
          map((user) => authorizationSuccess({ user })),
          catchError((error) => of(authorizationFailure({ error })))
        )
      )
    )
  );
}
