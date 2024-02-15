import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs';
import { BlogStatistics, Post } from '../_types/post.types';
import { Comment } from '../_types/comment.type';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { PaginatedResult } from '../_types/pagination';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private dataService: DataService) {}

  getBlog(
    page?: number,
    itemsPerPage?: number,
    column?: string,
    direction?: string
  ) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (direction && column) {
      params = params.append('column', column);
      params = params.append('direction', direction);
    }

    return this.dataService
      .get<HttpResponse<Post[]>>('post', { observe: 'response', params })
      .pipe(
        map((response) => {
          const paginatedResult = new PaginatedResult<Post[]>();
          if (response.body) paginatedResult.result = response.body;

          const pagination = response.headers.get('Pagination');

          if (pagination) paginatedResult.pagination = JSON.parse(pagination);

          return paginatedResult;
        })
      );
  }

  addPost(post: FormData) {
    return this.dataService.post<{ message: string }>(post, 'admin/addPost');
  }

  removePost(postId: number) {
    return this.dataService.delete<{ message: string }>(`post/${postId}`);
  }

  editPost(newPost: Post) {
    return this.dataService.patch<{ message: string }>(newPost, 'post');
  }

  getSearchedBlog(
    searchValue: string,
    page?: number,
    itemsPerPage?: number,
    column?: string,
    direction?: string
  ) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (direction && column) {
      params = params.append('column', column);
      params = params.append('direction', direction);
    }

    return this.dataService
      .get<HttpResponse<Post[]>>(`post/search?searchValue=${searchValue}`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          const paginatedResult = new PaginatedResult<Post[]>();

          if (response.body) paginatedResult.result = response.body;

          const pagination = response.headers.get('Pagination');

          if (pagination) paginatedResult.pagination = JSON.parse(pagination);
          return paginatedResult;
        })
      );
  }

  getPost(postId: number) {
    return this.dataService.get<Post>(`post/selected?postId=${postId}`);
  }

  getPostComments(postId: number) {
    return this.dataService.get<Comment[]>(`postComment?postId=${postId}`);
  }

  fetchBlogStatisticsForAdminPage() {
    return this.dataService.get<BlogStatistics>('admin/blogStatistics');
  }
}
