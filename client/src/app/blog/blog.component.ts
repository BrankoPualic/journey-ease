import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import {
  selectAllBlog,
  selectCurrentPage,
  selectSelectedCreator,
  selectTotalPages,
} from '../_store/blog/blog.selector';
import {
  loadBlog,
  loadSearchedBlog,
  removeSelectedCreator,
  setCurrentPage,
} from '../_store/blog/blog.actions';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';

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
  title = 'Blog Page';
  blog$ = this.store.select(selectAllBlog);
  searchValue = new FormControl('');
  typingSubscription?: Subscription;
  currentPage = 0;
  totalPages = 0;
  blogLoaded = false;

  constructor(
    private store: Store<AppState>,
    private elementRef: ElementRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['page'])
        this.store.dispatch(setCurrentPage({ currentPage: +params['page'] }));
    });
    this.store.select(selectSelectedCreator).subscribe((creator) => {
      if (creator) {
        this.searchValue.setValue(creator);
        this.store.dispatch(loadSearchedBlog({ searchValue: creator }));
      } else {
        this.searchValue.setValue('');
        // this.store.dispatch(loadBlog());
        this.store.select(selectCurrentPage).subscribe((page) => {
          this.currentPage = page;
          this.store.dispatch(loadBlog());
        });
      }
    });

    this.blog$.subscribe((data) => {
      if (data.length) this.blogLoaded = true;
      setTimeout(() => {
        this.animateContent();
      }, 0);
    });
    setTimeout(() => {
      this.store.select(selectTotalPages).subscribe((data) => {
        this.totalPages = data;
      });
    }, 10);

    this.typingSubscription = this.searchValue.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newSearchValue) => this.blogSearch(newSearchValue));
  }

  ngOnDestroy(): void {
    this.store.dispatch(removeSelectedCreator());
    this.blogLoaded = false;
  }

  blogSearch(searchValue: string | null) {
    if (searchValue === '') {
      this.store.dispatch(loadBlog());
      return;
    }
    if (searchValue) this.store.dispatch(loadSearchedBlog({ searchValue }));
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
}
