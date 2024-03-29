import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import { selectPost } from '../../_store/blog/blog.selector';
import {
  loadPost,
  removeSelectedPost,
  setSelectedCreator,
} from '../../_store/blog/blog.actions';
import { Post } from '../../_types/post.types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { BlogService } from '../../_services/blog.service';
import { CommentsComponent } from './comments/comments.component';
import { Comment } from '../../_types/comment.type';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, OnDestroy {
  $post = this.store.select(selectPost);
  post?: Post;
  isSignedIn = false;
  postComments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(loadPost({ postId: +params['id'] }));
      this.$post.subscribe({
        next: (post) => {
          if (post) {
            this.post = post;
            setTimeout(() => {
              this.animateContent();
            }, 0);
            this.blogService.getPostComments(this.post.postId).subscribe({
              next: (data) => (this.postComments = data),
            });
          }
        },
      });
    });
    this.isSignedIn = this.authService.isSignedIn();
  }

  ngOnDestroy(): void {
    this.store.dispatch(removeSelectedPost());
  }

  searchCreatorBlog(creator: string) {
    this.store.dispatch(setSelectedCreator({ creator }));
    this.router.navigateByUrl('/blog');
  }

  animateContent() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.localName === 'div')
              entry.target.classList.add('show-opacity');

            observer.unobserve(entry.target);
          }
        });
      });

      const hiddenEls: [] =
        this.elementRef.nativeElement.querySelectorAll('.hidden-el');
      hiddenEls.forEach((el: HTMLElement) => observer.observe(el));
    } else
      console.warn(
        'IntersectionObserver is not supported. Skipping animation.'
      );
  }
}
