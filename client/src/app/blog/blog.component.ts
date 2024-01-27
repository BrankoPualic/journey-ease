import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { selectAllBlog } from '../_store/blog/blog.selector';
import { loadBlog, loadSearchedBlog } from '../_store/blog/blog.actions';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blog$ = this.store.select(selectAllBlog);
  searchValue = new FormControl('');
  typingSubscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadBlog());

    this.typingSubscription = this.searchValue.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newSearchValue) => this.blogSearch(newSearchValue));
  }

  blogSearch(searchValue: string | null) {
    if (searchValue === '') {
      this.store.dispatch(loadBlog());
      return;
    }
    if (searchValue) this.store.dispatch(loadSearchedBlog({ searchValue }));
  }
}
