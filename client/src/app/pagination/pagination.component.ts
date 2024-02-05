import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TypeOfPagination } from '../_types/pagination';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { loadBlog } from '../_store/blog/blog.actions';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() totalPages?: number;
  @Input() itemsPerPage?: number;
  @Input() paginationType?: TypeOfPagination;
  @Input() currentPage?: number;
  totalItemsArray: number[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.totalItemsArray = new Array(this.totalPages).fill(0);
  }

  changePage(page: number) {
    switch (this.paginationType) {
      case 'blog':
        this.changeBlogPage(page);
        break;
    }
  }

  changeBlogPage(page: number) {
    this.store.dispatch(
      loadBlog({
        page,
        itemsPerPage: this.itemsPerPage ? this.itemsPerPage : 10,
      })
    );
  }
}
