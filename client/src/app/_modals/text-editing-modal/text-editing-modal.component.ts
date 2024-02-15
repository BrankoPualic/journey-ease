import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { easeOutOpacityAnimation } from '../../_animations/modal-animations';
import { ModalService } from '../../_services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-editing-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-editing-modal.component.html',
  styleUrl: './text-editing-modal.component.scss',
  animations: [easeOutOpacityAnimation],
})
export class TextEditingModalComponent implements OnInit, OnDestroy {
  @Input() key?: string;
  textWritten: FormGroup = this.fb.group({});
  textEditingModalMap = new Map<string, string>();
  textEditingModalMapSubscription?: Subscription;

  constructor(private modalService: ModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.textWritten = this.fb.group({
      postDescription: [''],
      postContent: [''],
    });

    this.textEditingModalMapSubscription =
      this.modalService.textEditingModalMap$.subscribe((map) => {
        this.textEditingModalMap = map;
        this.updateFormControl();
      });
  }
  ngOnDestroy(): void {
    this.textEditingModalMapSubscription?.unsubscribe();
  }

  updateFormControl() {
    if (this.textEditingModalMap) {
      this.textEditingModalMap.forEach((value, key) => {
        if (this.textWritten.controls[key]) {
          this.textWritten.controls[key].setValue(value);
        }
      });
    }
  }

  updateTextEditingModalMap(key: string) {
    this.modalService.setStatusTextEditingModal(
      false,
      key,
      this.textWritten.controls[key].value
    );
  }

  closeModal(key: string) {
    const value = this.textWritten.controls[key].value;
    this.modalService.setStatusTextEditingModal(false, key, value);
  }
}
