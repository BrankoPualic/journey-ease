import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { UserService } from '../../_services/user.service';
import {
  addSubscription,
  saveSubscriptionsFailure,
  saveSubscriptionsSuccess,
} from './newsletters.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';

@Injectable()
export class SubscriptionEffects {
  constructor(
    private action$: Actions,
    // private store: Store<AppState>,
    private userService: UserService
  ) {}

  addSubscription$ = createEffect(() =>
    this.action$.pipe(
      ofType(addSubscription),
      switchMap((action) => {
        return from(
          this.userService.addSubscription(action.email).pipe(
            map(() => saveSubscriptionsSuccess()),
            catchError((error) => {
              console.log(error);
              return of(saveSubscriptionsFailure({ error }));
            })
          )
        );
      })
    )
  );
}
