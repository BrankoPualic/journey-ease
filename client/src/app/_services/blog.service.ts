import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Post } from '../_types/post.type';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private dataService: DataService) {}

  getBlog(): Observable<Post[]> {
    return this.dataService.get('post');
  }
}
