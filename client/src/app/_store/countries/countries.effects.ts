import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { DestinationService } from '../../_services/destination.service';
import {
  loadCountries,
  loadCountriesFailure,
  loadCountriesSuccess,
} from './countries.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private destinationService: DestinationService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountries),
      switchMap(() =>
        this.destinationService.getCountries().pipe(
          map((countries) => loadCountriesSuccess({ countries })),
          catchError((error) => of(loadCountriesFailure({ error })))
        )
      )
    )
  );
}
