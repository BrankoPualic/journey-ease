import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { Comment } from '../../../_types/comment.type';
import { ITEMS_PER_PAGE, Pagination } from '../../../_types/pagination';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/app.state';
import { SharedService } from '../../../_services/shared.service';
import {
  selectCommentsPost,
  selectCommentsState,
} from '../../../_store/comments/comments.selector';
import { Subscription } from 'rxjs';
import {
  loadComments,
  removeComment,
} from '../../../_store/comments/comments.actions';
import { ModalService } from '../../../_services/modal.service';

@Component({
  selector: 'app-admin-post-comments',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './admin-post-comments.component.html',
  styleUrl: './admin-post-comments.component.scss',
})
export class AdminPostCommentsComponent implements OnInit, OnDestroy {
  comments$ = this.store.select(selectCommentsState);
  postId$ = this.store.select(selectCommentsPost);
  commentKeys: string[] = [];
  comments: Comment[] = [];
  pagination?: Pagination;
  stateDirection: string | undefined = 'descending';
  stateOrderingColumn: string | undefined = 'CommentDate';
  orderingOptions = new Map<string, string>();
  commentSubscription?: Subscription;
  postId: number = 0;

  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initializeBody();

    this.orderingOptions.set('Comment Id', 'descending');
    this.orderingOptions.set('Comment Date', 'ascending');
  }

  ngOnDestroy(): void {
    this.commentSubscription?.unsubscribe();
  }

  initializeBody() {
    this.commentSubscription =
      (this.postId$.subscribe((postId) => {
        this.postId = postId;
        return this.store.dispatch(
          loadComments({ postId, page: 1, itemsPerPage: ITEMS_PER_PAGE })
        );
      }),
      this.comments$.subscribe((state) => {
        this.comments = state.comments;
        if (state.comments.length) {
          this.commentKeys = this.sharedService.getObjKeys(this.comments[0]);
          let tmpKey = this.commentKeys[4];
          this.commentKeys[4] = this.commentKeys[1];
          this.commentKeys[1] = tmpKey;
          tmpKey = this.commentKeys[4];
          this.commentKeys[4] = this.commentKeys[3];
          this.commentKeys[3] = this.commentKeys[2];
          this.commentKeys[2] = tmpKey;
        }
        this.stateOrderingColumn = state.orderingColumn;
        this.stateDirection = state.direction;

        if (state.pagination.totalPages) {
          this.pagination = state.pagination;
        }
      }));
  }

  orderBy(column: string) {
    const currentDirection = this.orderingOptions.get(column);
    const newDirection =
      currentDirection === 'ascending' ? 'descending' : 'ascending';
    this.orderingOptions.set(column, newDirection);

    const columnUsed = column.replace(' ', '');
    const page =
      this.pagination?.currentPage !== undefined
        ? this.pagination.currentPage
        : 1;

    this.store.dispatch(
      loadComments({
        postId: this.postId,
        page,
        itemsPerPage: ITEMS_PER_PAGE,
        column: columnUsed,
        direction: newDirection,
      })
    );
  }

  seeUser(userId: number) {}

  openTextReviewModal(comment: string) {
    this.modalService.setStatusTextReviewModal(true, 'Comment', comment);
  }

  onDeleteComment(commentId: number) {
    this.store.dispatch(removeComment({ commentId }));
  }
}
