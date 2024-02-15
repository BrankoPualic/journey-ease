import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../_types/post.types';
import { easeOutOpacityAnimation } from '../../_animations/modal-animations';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../_services/modal.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import { editPost } from '../../_store/blog/blog.actions';

@Component({
  selector: 'app-post-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-modal.component.html',
  styleUrl: './post-edit-modal.component.scss',
  animations: [easeOutOpacityAnimation],
})
export class PostEditModalComponent implements OnInit {
  @Input() post?: Post;
  editPostForm: FormGroup = this.fb.group({});
  formData = new FormData();

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.editPostForm = this.fb.group({
      postTitle: [this.post?.postTitle, Validators.required],
      postContent: [this.post?.postContent, Validators.required],
      creatorName: [this.post?.creatorName, Validators.required],
      postDescription: [this.post?.postDescription, Validators.required],
    });
  }

  onImageChange(fileInput: HTMLInputElement) {
    if (fileInput.files![0] === undefined) return;

    const file = fileInput.files![0];

    this.formData.append('image', file);
  }

  editPost() {
    const postTitle = this.editPostForm.get('postTitle')?.value;
    const postContent = this.editPostForm.get('postContent')?.value;
    const creatorName = this.editPostForm.get('creatorName')?.value;
    const postDescription = this.editPostForm.get('postDescription')?.value;
    const postId = this.post?.postId;

    if (postId !== undefined) this.formData.append('postId', postId.toString());
    this.formData.append('postTitle', postTitle);
    this.formData.append('postContent', postContent);
    this.formData.append('postDescription', postDescription);
    this.formData.append('creatorName', creatorName);

    this.store.dispatch(editPost({ updatedPost: this.formData }));

    this.closeModal();
  }

  closeModal() {
    this.modalService.setStatusPostEditModal(false, {} as Post);
  }
}
