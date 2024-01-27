import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { BlogService } from '../../_services/blog.service';
import {
  addPost,
  editPost,
  loadBlog,
  loadBlogFailure,
  loadBlogSuccess,
  loadSearchedBlog,
  removePost,
  saveBlogFailure,
  saveBlogSuccess,
} from './blog.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectAllBlog } from './blog.selector';

@Injectable()
export class BlogEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private blogService: BlogService
  ) {}

  loadBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlog),
      switchMap(() =>
        this.blogService.getBlog().pipe(
          map((blog) => loadBlogSuccess({ blog })),
          catchError((error) => of(loadBlogFailure({ error })))
        )
      )
    )
  );

  loadSearchedBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchedBlog),
      withLatestFrom(this.store.select(selectAllBlog)),
      switchMap(([action, blog]) =>
        this.blogService.getSearchedBlog(action.searchValue).pipe(
          map((blog) => loadBlogSuccess({ blog })),
          catchError((error) => of(loadBlogFailure({ error })))
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      withLatestFrom(this.store.select(selectAllBlog)),
      switchMap(([action, blog]) => {
        return from(
          this.blogService.addPost(action.post).pipe(
            map(() => saveBlogSuccess()),
            catchError((error) => of(saveBlogFailure({ error })))
          )
        );
      })
    )
  );

  removePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removePost),
      withLatestFrom(this.store.select(selectAllBlog)),
      switchMap(([action, blog]) => {
        return from(
          this.blogService.removePost(action.postId).pipe(
            map(() => saveBlogSuccess()),
            catchError((error) => of(saveBlogFailure({ error })))
          )
        );
      })
    )
  );

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPost),
      withLatestFrom(this.store.select(selectAllBlog)),
      switchMap(([action, blog]) => {
        return from(
          this.blogService.editPost(action.updatedPost).pipe(
            map(() => saveBlogSuccess()),
            catchError((error) => of(saveBlogFailure({ error })))
          )
        );
      })
    )
  );

  loadAfterSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveBlogSuccess),
      map(() => loadBlog())
    )
  );
}
