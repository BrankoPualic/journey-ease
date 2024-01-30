import { Component, Input } from '@angular/core';
import { Comment } from '../../../_types/comment.type';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() postComments: Comment[] = [];
  isSignedIn = false;

  constructor(private authService: AuthService) {
    this.isSignedIn = this.authService.isSignedIn();
  }

  editComment() {}

  deleteComment() {}
}
