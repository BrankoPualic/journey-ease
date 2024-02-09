import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import {
  selectAllBlog,
  selectBlogState,
  selectSelectedCreator,
} from '../_store/blog/blog.selector';
import {
  loadBlog,
  loadSearchedBlog,
  removeSelectedCreator,
  setCurrentPage,
} from '../_store/blog/blog.actions';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { ITEMS_PER_PAGE, Pagination } from '../_types/pagination';
import { Post } from '../_types/post.types';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    PaginationComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  blog$ = this.store.select(selectBlogState);
  blog: Post[] = [];
  pagination?: Pagination;
  searchValue = new FormControl('');
  typingSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.initializeBlog();

    this.searchTypingManagment();
  }

  initializeBlog() {
    this.blog$.subscribe((state) => {
      this.blog = state.blog;
      this.pagination = state.pagination;
      setTimeout(() => {
        this.animateContent();
        this.scrollToTop();
      }, 0);
    });

    this.store.select(selectSelectedCreator).subscribe((creator) => {
      if (creator) {
        this.searchValue.setValue(creator);
        this.store.dispatch(
          loadSearchedBlog({
            searchValue: creator,
            page: 1,
            itemsPerPage: ITEMS_PER_PAGE,
          })
        );
      } else {
        this.searchValue.setValue('');
        this.store.dispatch(
          loadBlog({ page: 1, itemsPerPage: ITEMS_PER_PAGE })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(removeSelectedCreator());
    this.typingSubscription?.unsubscribe();
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId))
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  blogSearch(searchValue: string | null) {
    if (searchValue === '') {
      this.store.dispatch(removeSelectedCreator());
      this.store.dispatch(loadBlog({ page: 1, itemsPerPage: ITEMS_PER_PAGE }));
      return;
    }
    if (searchValue)
      this.store.dispatch(
        loadSearchedBlog({ searchValue, page: 1, itemsPerPage: ITEMS_PER_PAGE })
      );
    this.blog$.subscribe(() => {
      setTimeout(() => {
        this.animateContent();
      }, 0);
    });
  }

  animateContent() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.localName === 'div')
              entry.target.classList.add('show-opacity');

            observer.unobserve(entry.target);
          }
        });
      });

      const hiddenEls: [] =
        this.elementRef.nativeElement.querySelectorAll('.hidden-el');
      hiddenEls.forEach((el: HTMLElement) => observer.observe(el));
    } else
      console.warn(
        'IntersectionObserver is not supported. Skipping animation.'
      );
  }

  private searchTypingManagment() {
    this.typingSubscription = this.searchValue.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newSearchValue) => this.blogSearch(newSearchValue));
  }
}
