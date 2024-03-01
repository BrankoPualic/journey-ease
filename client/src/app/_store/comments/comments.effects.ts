import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  removeComment,
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  saveCommentsFailure,
  saveCommentsSuccess,
} from './comments.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ITEMS_PER_PAGE } from '../../_types/pagination';
import { selectCommentsPost } from './comments.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { BlogService } from '../../_services/blog.service';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
    private store: Store<AppState>
  ) {}

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComments),
      switchMap((action) =>
        this.blogService
          .getComments(
            action.postId,
            action.page,
            action.itemsPerPage,
            action.column,
            action.direction
          )
          .pipe(
            map((result) => loadCommentsSuccess({ paginatedResult: result })),
            catchError((error) => of(loadCommentsFailure({ error })))
          )
      )
    )
  );

  removeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeComment),
      switchMap((action) => {
        return from(
          this.blogService.removeComment(action.commentId).pipe(
            map(() => saveCommentsSuccess()),
            catchError((error) => of(saveCommentsFailure({ error })))
          )
        );
      })
    )
  );

  loadAfterSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCommentsSuccess),
      withLatestFrom(this.store.select(selectCommentsPost)),
      map(([action, postId]) =>
        loadComments({ postId, page: 1, itemsPerPage: ITEMS_PER_PAGE })
      )
    )
  );
}
