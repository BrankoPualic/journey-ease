import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { DestinationService } from '../../_services/destination.service';
import {
  loadSeasons,
  loadSeasonsFailure,
  loadSeasonsSuccess,
} from './destinations.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class DestinationEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private destinationService: DestinationService
  ) {}

  loadSeasons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSeasons),
      switchMap(() =>
        this.destinationService.getSeasons().pipe(
          map((seasons) => loadSeasonsSuccess({ seasons })),
          catchError((error) => of(loadSeasonsFailure({ error })))
        )
      )
    )
  );
}
