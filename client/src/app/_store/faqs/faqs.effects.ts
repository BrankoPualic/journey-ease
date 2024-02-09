import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FaqsService } from '../../_services/faqs.service';
import { loadFaqs, loadFaqsFailure, loadFaqsSuccess } from './faqs.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FaqEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private faqService: FaqsService
  ) {}

  loadFaqs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFaqs),
      switchMap(() =>
        this.faqService.getFaqs().pipe(
          map((faqs) => loadFaqsSuccess({ faqs })),
          catchError((error) => of(loadFaqsFailure({ error })))
        )
      )
    )
  );
}
