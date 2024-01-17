import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { DestinationService } from '../../_services/destination.service';
import {
  addCountry,
  editCountry,
  loadCountries,
  loadCountriesFailure,
  loadCountriesSuccess,
  removeCountry,
  saveCountriesFailure,
  saveCountriesSuccess,
} from './countries.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectAllCountries } from './countries.selectors';

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

  addCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCountry),
      withLatestFrom(this.store.select(selectAllCountries)),
      switchMap(([action, countries]) => {
        return from(
          this.destinationService.addCountry(action.countryName).pipe(
            map(() => {
              return saveCountriesSuccess();
            }),
            catchError((error) => {
              console.log(error);
              return of(saveCountriesFailure({ error }));
            })
          )
        );
      })
    )
  );

  removeCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCountry),
      withLatestFrom(this.store.select(selectAllCountries)),
      switchMap(([action, countries]) => {
        return from(
          this.destinationService.removeCountry(action.countryId).pipe(
            map(() => {
              return saveCountriesSuccess();
            }),
            catchError((error) => {
              console.log(error);
              return of(saveCountriesFailure({ error }));
            })
          )
        );
      })
    )
  );

  editCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editCountry),
      withLatestFrom(this.store.select(selectAllCountries)),
      switchMap(([action, countries]) => {
        return from(
          this.destinationService.editCountry(action.content).pipe(
            map(() => {
              return saveCountriesSuccess();
            }),
            catchError((error) => {
              console.log(error);
              return of(saveCountriesFailure({ error }));
            })
          )
        );
      })
    )
  );

  loadAfterSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCountriesSuccess),
      map(() => {
        return loadCountries();
      })
    )
  );
}
