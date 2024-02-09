import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import {
  selectBlogState,
  selectBlogStats,
  selectSelectedCreator,
} from '../../_store/blog/blog.selector';
import {
  blogStatistics,
  loadBlog,
  loadSearchedBlog,
  removeSelectedCreator,
} from '../../_store/blog/blog.actions';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Post } from '../../_types/post.types';
import { ITEMS_PER_PAGE, Pagination } from '../../_types/pagination';
import { SharedService } from '../../_services/shared.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.scss',
})
export class AdminBlogComponent implements OnInit, OnDestroy {
  blogStats$ = this.store.select(selectBlogStats);
  blog$ = this.store.select(selectBlogState);
  blog: Post[] = [];
  pagination?: Pagination;
  stateOrderingColumn: string | undefined = 'PostDate';
  stateDirection: string | undefined = 'descending';
  postKeys: string[] = [];
  post: FormGroup = this.fb.group({});
  blogSubscription?: Subscription;
  searchValue = new FormControl('');
  typingSubscription?: Subscription;
  orderingOptions = new Map<string, string>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(blogStatistics());

    this.bodyInitialization();

    this.searchTypingManagement();

    this.orderingOptions.set('Post Id', 'descending');
    this.orderingOptions.set('Post Date', 'ascending');
  }

  ngOnDestroy(): void {
    this.blogSubscription?.unsubscribe();
  }

  bodyInitialization() {
    this.blogSubscription = this.blog$.subscribe((state) => {
      this.blog = state.blog;
      this.postKeys = this.sharedService.getObjKeys(this.blog[0]);
      this.stateOrderingColumn = state.orderingColumn;
      this.stateDirection = state.direction;

      if (state.pagination.totalPages) {
        this.pagination = state.pagination;
      }
    });

    this.store.dispatch(loadBlog({ page: 1, itemsPerPage: ITEMS_PER_PAGE }));
  }

  onInsertPost() {}

  blogSearch(searchValue: string | null) {
    if (searchValue === '') {
      this.store.dispatch(removeSelectedCreator());
      this.store.dispatch(
        loadBlog({
          page: 1,
          itemsPerPage: ITEMS_PER_PAGE,
          column: this.stateOrderingColumn,
          direction: this.stateDirection,
        })
      );
      return;
    }
    if (searchValue)
      this.store.dispatch(
        loadSearchedBlog({
          searchValue,
          page: 1,
          itemsPerPage: ITEMS_PER_PAGE,
          column: this.stateOrderingColumn,
          direction: this.stateDirection,
        })
      );
  }

  orderBy(column: string) {
    const currentDirection = this.orderingOptions.get(column);
    const newDirection =
      currentDirection === 'ascending' ? 'descending' : 'ascending';
    this.orderingOptions.set(column, newDirection);

    const columnUsed = column.replace(' ', '');
    const page =
      this.pagination?.currentPage !== undefined
        ? this.pagination.currentPage
        : 1;
    this.store.dispatch(
      loadBlog({
        page: page,
        itemsPerPage: ITEMS_PER_PAGE,
        column: columnUsed,
        direction: newDirection,
      })
    );
  }

  private searchTypingManagement() {
    this.typingSubscription = this.searchValue.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newSearchValue) => this.blogSearch(newSearchValue));
  }
}
