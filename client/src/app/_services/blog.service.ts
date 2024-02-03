import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { BlogResponse, Post } from '../_types/post.types';
import { Comment } from '../_types/comment.type';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private dataService: DataService) {}

  getBlog(page: number, pageSize = 5): Observable<BlogResponse> {
    return this.dataService.get(`post?page=${page}&pageSize=${pageSize}`);
  }

  addPost(post: Post): Observable<{ message: string }> {
    return this.dataService.post(post, 'post');
  }

  removePost(postId: number): Observable<{ message: string }> {
    return this.dataService.delete(`post/${postId}`);
  }

  editPost(newPost: Post): Observable<{ message: string }> {
    return this.dataService.patch(newPost, 'post');
  }

  getSearchedBlog(searchValue: string): Observable<Post[]> {
    return this.dataService.get(`post/search?searchValue=${searchValue}`);
  }

  getPost(postId: number) {
    return this.dataService.get<Post>(`post/selected?postId=${postId}`);
  }

  getPostComments(postId: number) {
    return this.dataService.get<Comment[]>(`postComment?postId=${postId}`);
  }
}
