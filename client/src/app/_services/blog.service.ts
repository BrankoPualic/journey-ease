import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../_types/post.type';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private dataService: DataService) {}

  getBlog(): Observable<Post[]> {
    return this.dataService.get('post');
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
}
