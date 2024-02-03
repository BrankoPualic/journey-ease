import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../_store/app.state';
import { Store } from '@ngrx/store';
import { setCurrentPage } from '../_store/blog/blog.actions';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() currentPage?: number;
  @Input() totalPages?: number;
  @Input() whichPaginationSource?: string;
  totalPagesArray: number[] = [];
  activePage = 1;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.totalPagesArray = new Array(this.totalPages).fill(0);
    this.route.queryParams.subscribe((params) => {
      this.activePage = +params['page'];
    });
  }

  loadSelectedPage(page: number) {
    switch (this.whichPaginationSource) {
      case 'Blog Page':
        this.loadSelectedPageBlog(page);
        break;
      case 'Post Page Comments':
        this.loadSelectedPageComments(page);
        break;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  loadSelectedPageBlog(page: number) {
    this.store.dispatch(setCurrentPage({ currentPage: page }));
  }

  loadSelectedPageComments(page: number) {}
}
