import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE, TypeOfPagination } from '../_types/pagination';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { loadBlog, loadSearchedBlog } from '../_store/blog/blog.actions';
import { selectSelectedCreator } from '../_store/blog/blog.selector';

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
  @Input() orderingColumn?: string;
  @Input() direction?: string;
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
    const itemsPerPage = this.itemsPerPage ? this.itemsPerPage : ITEMS_PER_PAGE;
    this.store.select(selectSelectedCreator).subscribe((creator) => {
      if (creator) {
        this.store.dispatch(
          loadSearchedBlog({
            searchValue: creator,
            page,
            itemsPerPage: itemsPerPage,
            column: this.orderingColumn,
            direction: this.direction,
          })
        );
      } else
        this.store.dispatch(
          loadBlog({
            page,
            itemsPerPage: itemsPerPage,
            column: this.orderingColumn,
            direction: this.direction,
          })
        );
    });
  }
}
