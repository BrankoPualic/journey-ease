export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export class PaginatedResult<T> {
  result?: T;
  pagination?: Pagination;
}

export type TypeOfPagination = 'blog' | 'comments';

export const ITEMS_PER_PAGE = 10;
