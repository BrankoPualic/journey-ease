import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { loadBlog } from '../_store/blog/blog.actions';
import { selectAllBlog, selectBlogState } from '../_store/blog/blog.selector';
import { BlogState } from '../_store/blog/blog.reducer';

export const blogResolver: ResolveFn<BlogState> = (route, state) => {
  inject(Store<AppState>).dispatch(loadBlog({ page: 1, itemsPerPage: 5 }));

  return inject(Store<AppState>).select(selectBlogState);
};
