import { Component } from '@angular/core';
import { BlogService } from '../_services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  constructor(private blogService: BlogService) {
    this.blogService.getBlog().subscribe((blog) => console.log(blog));
  }
}
