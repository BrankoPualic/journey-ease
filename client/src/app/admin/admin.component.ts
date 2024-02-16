import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalService } from '../_services/modal.service';
import { TextReviewModalComponent } from '../_modals/text-review-modal/text-review-modal.component';
import { Subscription, map, take } from 'rxjs';
import { PhotoModalComponent } from '../_modals/photo-modal/photo-modal.component';
import { TextEditingModalComponent } from '../_modals/text-editing-modal/text-editing-modal.component';
import { PostEditModalComponent } from '../_modals/post-edit-modal/post-edit-modal.component';
import { Post } from '../_types/post.types';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TextReviewModalComponent,
    PhotoModalComponent,
    TextEditingModalComponent,
    PostEditModalComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, OnDestroy {
  textReviewModalStatus = false;
  textReviewModalTitle?: string;
  textReviewModalText?: string;

  photoModalStatus = false;
  imagesArray: string[] = [];

  textEditingModalStatus = false;
  whatIsEdited?: string;

  postEditModalStatus = false;
  selectedPost?: Post;

  allSubscriptions: Subscription[] = [];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.allSubscriptions.push(
      this.modalService.activePhotoModal$
        .pipe(
          map((active) => {
            if (active)
              this.modalService.activePhotoModalImages$
                .pipe(take(1))
                .subscribe({
                  next: (urlArray) => (this.imagesArray = urlArray),
                });
            return active;
          })
        )
        .subscribe({
          next: (active) => (this.photoModalStatus = active),
        }),

      this.modalService.activeTextReviewModal$
        .pipe(
          map((active) => {
            if (active)
              this.modalService.activeTextReviewModalContent$
                .pipe(take(1))
                .subscribe({
                  next: (content) => {
                    this.textReviewModalTitle = content[0];
                    this.textReviewModalText = content[1];
                  },
                });
            return active;
          })
        )
        .subscribe({
          next: (active) => (this.textReviewModalStatus = active),
        }),

      this.modalService.activeTextEditingModal$
        .pipe(
          map((active) => {
            if (active)
              this.modalService.setKeyAsToWhatAreYouEditing$
                .pipe(take(1))
                .subscribe({
                  next: (key) => (this.whatIsEdited = key),
                });
            return active;
          })
        )
        .subscribe({
          next: (active) => (this.textEditingModalStatus = active),
        }),

      this.modalService.postEditModalStatus$
        .pipe(
          map((active) => {
            if (active)
              this.modalService.postForEditing$.subscribe({
                next: (post) => (this.selectedPost = post),
              });
            return active;
          })
        )
        .subscribe({ next: (active) => (this.postEditModalStatus = active) })
    );
  }

  ngOnDestroy(): void {
    this.allSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
