import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { BlogService } from '../../_services/blog.service';
import {
  addPost,
  blogStatistics,
  editPost,
  loadBlog,
  loadBlogFailure,
  loadBlogStatisticsFailure,
  loadBlogStatisticsSuccess,
  loadBlogSuccess,
  loadPost,
  loadPostFailure,
  loadPostSuccess,
  loadSearchedBlog,
  removePost,
  saveBlogFailure,
  saveBlogSuccess,
} from './blog.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectAllBlog } from './blog.selector';
import { ITEMS_PER_PAGE } from '../../_types/pagination';

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
      switchMap((action) =>
        this.blogService
          .getBlog(
            action.page,
            action.itemsPerPage,
            action.column,
            action.direction
          )
          .pipe(
            map((result) => loadBlogSuccess({ paginatedResult: result })),
            catchError((error) => of(loadBlogFailure({ error })))
          )
      )
    )
  );

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPost),
      switchMap((action) =>
        this.blogService.getPost(action.postId).pipe(
          map((post) => loadPostSuccess({ post })),
          catchError((error) => of(loadPostFailure({ error })))
        )
      )
    )
  );

  loadSearchedBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchedBlog),
      switchMap((action) =>
        this.blogService
          .getSearchedBlog(
            action.searchValue,
            action.page,
            action.itemsPerPage,
            action.column,
            action.direction
          )
          .pipe(
            map((result) => loadBlogSuccess({ paginatedResult: result })),
            catchError((error) => of(loadBlogFailure({ error })))
          )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      switchMap((action) => {
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
      map(() => loadBlog({ page: 1, itemsPerPage: ITEMS_PER_PAGE }))
    )
  );

  blogStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blogStatistics),
      switchMap((action) =>
        this.blogService.fetchBlogStatisticsForAdminPage().pipe(
          map(
            (stats) => loadBlogStatisticsSuccess({ stats }),
            catchError((error) => of(loadBlogStatisticsFailure({ error })))
          )
        )
      )
    )
  );
}
