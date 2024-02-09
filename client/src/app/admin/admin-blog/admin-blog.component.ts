import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import {
  selectBlogState,
  selectBlogStats,
  selectSelectedCreator,
} from '../../_store/blog/blog.selector';
import { blogStatistics, loadBlog } from '../../_store/blog/blog.actions';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../_types/post.types';
import { Pagination } from '../../_types/pagination';
import { SharedService } from '../../_services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.scss',
})
export class AdminBlogComponent implements OnInit, OnDestroy {
  blogStats$ = this.store.select(selectBlogStats);
  blog$ = this.store.select(selectBlogState);
  blog: Post[] = [];
  pagination?: Pagination;
  postKeys: string[] = [];
  post: FormGroup = this.fb.group({});
  blogSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(blogStatistics());

    this.bodyInitialization();
  }

  ngOnDestroy(): void {
    this.blogSubscription?.unsubscribe();
  }

  bodyInitialization() {
    this.blogSubscription = this.blog$.subscribe((state) => {
      if (state.blog.length) {
        this.blog = state.blog;
        this.pagination = state.pagination;
        this.postKeys = this.sharedService.getObjKeys(this.blog[0]);
      }
    });

    this.store.dispatch(loadBlog({ page: 1, itemsPerPage: 15 }));
  }

  onInsertPost() {}
}
