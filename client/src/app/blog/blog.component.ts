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
} from '../_store/blog/blog.actions';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { Pagination } from '../_types/pagination';
import { Post } from '../_types/post.type';

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
    // const resolvedData = this.route.snapshot.data['blogData'];
    // this.blog = resolvedData.blog;
    // console.log(resolvedData);
    // setTimeout(() => {
    //   this.animateContent();
    // }, 0);
    // this.pagination = resolvedData.pagination;

    this.blog$.subscribe((state) => {
      this.blog = state.blog;
      this.pagination = state.pagination;
      setTimeout(() => {
        this.animateContent();
        this.scrollToTop();
      }, 0);
    });

    // this.pagination = resolvedData.paginatedResult;

    // this.store.select(selectSelectedCreator).subscribe((creator) => {
    //   if (creator) {
    //     this.searchValue.setValue(creator);
    //     this.store.dispatch(loadSearchedBlog({ searchValue: creator }));
    //   } else {
    //     this.searchValue.setValue('');
    //     this.store.dispatch(loadBlog());
    //   }
    // });
    // this.blog$.subscribe((state) => {
    //   (this.blog = state.blog), (this.pagination = state.pagination);
    //   // console.log(state);
    //   setTimeout(() => {
    //     this.animateContent();
    //   }, 0);
    // });

    // this.typingSubscription = this.searchValue.valueChanges
    //   .pipe(debounceTime(500), distinctUntilChanged())
    //   .subscribe((newSearchValue) => this.blogSearch(newSearchValue));
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId))
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.store.dispatch(removeSelectedCreator());
  }

  // blogSearch(searchValue: string | null) {
  //   if (searchValue === '') {
  //     this.store.dispatch(loadBlog());
  //     return;
  //   }
  //   if (searchValue) this.store.dispatch(loadSearchedBlog({ searchValue }));
  //   this.blog$.subscribe(() => {
  //     setTimeout(() => {
  //       this.animateContent();
  //     }, 0);
  //   });
  // }

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
