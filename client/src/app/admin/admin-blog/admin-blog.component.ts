import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import {
  selectBlogState,
  selectBlogStats,
  selectSelectedCreator,
} from '../../_store/blog/blog.selector';
import {
  addPost,
  blogStatistics,
  loadBlog,
  loadSearchedBlog,
  removePost,
  removeSelectedCreator,
  setSelectedCreator,
} from '../../_store/blog/blog.actions';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from '../../_types/post.types';
import { ITEMS_PER_PAGE, Pagination } from '../../_types/pagination';
import { SharedService } from '../../_services/shared.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ModalService } from '../../_services/modal.service';
import { TextReviewModalComponent } from '../../_modals/text-review-modal/text-review-modal.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent,
    TextReviewModalComponent,
    RouterOutlet,
  ],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.scss',
})
export class AdminBlogComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  blogStats$ = this.store.select(selectBlogStats);
  blog$ = this.store.select(selectBlogState);
  blog: Post[] = [];
  pagination?: Pagination;
  postKeys: string[] = [];
  postForm: FormGroup = this.fb.group({});
  formData = new FormData();
  imageUploaded = false;
  blogSubscription?: Subscription;
  searchValue = new FormControl('');
  typingSubscription?: Subscription;

  stateOrderingColumn: string | undefined = 'PostDate';
  stateDirection: string | undefined = 'descending';
  orderingOptions = new Map<string, string>();

  textEditingModalMapSubscription?: Subscription;
  textEditingModalMap?: Map<string, string>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private modalService: ModalService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(blogStatistics());

    this.bodyInitialization();

    this.searchTypingManagement();

    this.orderingOptions.set('Post Id', 'descending');
    this.orderingOptions.set('Post Date', 'ascending');

    this.textEditingModalMapSubscription =
      this.modalService.textEditingModalMap$.subscribe(
        (map) => (this.textEditingModalMap = map)
      );

    this.modalService.textEditingModalMap$.subscribe((map) => {
      map.forEach((value, key) => {
        if (this.postForm.controls[key])
          this.postForm.controls[key].setValue(value);
      });
    });
  }

  ngOnDestroy(): void {
    this.blogSubscription?.unsubscribe();
    this.store.dispatch(removeSelectedCreator());
  }

  initializeForm() {
    this.postForm = this.fb.group({
      postTitle: ['', Validators.required],
      postContent: ['', Validators.required],
      creatorName: ['', Validators.required],
      postDescription: ['', Validators.required],
    });
  }

  bodyInitialization() {
    this.blogSubscription = this.blog$.subscribe((state) => {
      this.blog = state.blog;
      if (state.blog.length) {
        this.postKeys = this.sharedService.getObjKeys(this.blog[0]);
      }
      this.stateOrderingColumn = state.orderingColumn;
      this.stateDirection = state.direction;

      if (state.pagination.totalPages) {
        this.pagination = state.pagination;
      }
    });

    this.store.select(selectSelectedCreator).subscribe((creator) => {
      if (creator) {
        this.store.dispatch(
          loadSearchedBlog({
            searchValue: creator,
            page: 1,
            itemsPerPage: ITEMS_PER_PAGE,
          })
        );
      } else
        this.store.dispatch(
          loadBlog({ page: 1, itemsPerPage: ITEMS_PER_PAGE })
        );
    });

    this.initializeForm();
  }

  onInsertPost() {
    if (!this.postForm.valid || !this.imageUploaded) return;

    const postTitle = this.postForm.controls['postTitle'].value;
    const postContent = this.postForm.controls['postContent'].value;
    const creatorName = this.postForm.controls['creatorName'].value;
    const postDescription = this.postForm.controls['postDescription'].value;
    this.formData.append('postTitle', postTitle);
    this.formData.append('postContent', postContent);
    this.formData.append('creatorName', creatorName);
    this.formData.append('postDescription', postDescription);

    this.store.dispatch(addPost({ post: this.formData }));

    this.postForm.reset();

    this.modalService.clearTextEditingModalMap();

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

    this.imageUploaded = false;
  }

  uploadImage() {
    this.fileInput?.nativeElement.click();
  }

  onImageInputChange(fileInput: HTMLInputElement) {
    if (fileInput.files![0] === undefined) return;

    const file = fileInput.files![0];

    this.formData.append('image', file);
    this.imageUploaded = true;
  }

  blogSearch(searchValue: string | null) {
    if (searchValue === '') {
      this.store.dispatch(removeSelectedCreator());
      this.store.dispatch(
        loadBlog({
          page: 1,
          itemsPerPage: ITEMS_PER_PAGE,
          column: this.stateOrderingColumn,
          direction: this.stateDirection,
        })
      );
      return;
    }
    if (searchValue) {
      this.store.dispatch(setSelectedCreator({ creator: searchValue }));
      this.store.dispatch(
        loadSearchedBlog({
          searchValue,
          page: 1,
          itemsPerPage: ITEMS_PER_PAGE,
          column: this.stateOrderingColumn,
          direction: this.stateDirection,
        })
      );
    }
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

    this.store.select(selectSelectedCreator).subscribe((creator) => {
      if (creator) {
        this.store.dispatch(
          loadSearchedBlog({
            searchValue: creator,
            page: page,
            itemsPerPage: ITEMS_PER_PAGE,
            column: columnUsed,
            direction: newDirection,
          })
        );
      } else {
        this.store.dispatch(
          loadBlog({
            page: page,
            itemsPerPage: ITEMS_PER_PAGE,
            column: columnUsed,
            direction: newDirection,
          })
        );
      }
    });
  }

  openTextReviewModal(text: string, title: string) {
    this.modalService.setStatusTextReviewModal(true, title, text);
  }

  openPhotoModal(imgUrl: string) {
    this.modalService.setStatusPhotoModal(true, [imgUrl]);
  }

  openTextEditingModal(key: string) {
    this.modalService.setKeyWhatIsEdited(key);
    if (this.textEditingModalMap && this.textEditingModalMap.has(key)) {
      const value =
        this.textEditingModalMap.get(key) !== undefined
          ? this.textEditingModalMap.get(key)
          : '';
      if (value) this.modalService.setStatusTextEditingModal(true, key, value);
      return;
    }

    this.modalService.setStatusTextEditingModal(true, key, '');
  }

  onRowAction(postId: number) {
    const operationMenuVisible = this.elementRef.nativeElement.querySelector(
      '.operations-menu:not(.hidden)'
    );

    if (operationMenuVisible) operationMenuVisible.classList.toggle('hidden');

    const selectedOperationMenu = this.elementRef.nativeElement.querySelector(
      `.operations-menu-post-${postId}`
    );

    if (operationMenuVisible === selectedOperationMenu) return;

    selectedOperationMenu.classList.toggle('hidden');
  }

  onEditPostRow(post: Post) {
    this.modalService.setStatusPostEditModal(true, post);
  }

  onDeletePostRow(postId: number) {
    this.store.dispatch(removePost({ postId }));
  }

  onPostCommentRow(postId: number) {
    // this.store.dispatch(loadComments({postId}))
    this.router.navigateByUrl('/admin/blog/comments');
  }

  private searchTypingManagement() {
    this.typingSubscription = this.searchValue.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newSearchValue) => this.blogSearch(newSearchValue));
  }
}
