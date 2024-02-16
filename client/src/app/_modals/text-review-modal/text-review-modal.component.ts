import { Component, Input } from '@angular/core';
import { ModalService } from '../../_services/modal.service';
import { easeOutOpacityAnimation } from '../../_animations/modal-animations';

@Component({
  selector: 'app-text-review-modal',
  standalone: true,
  imports: [],
  templateUrl: './text-review-modal.component.html',
  styleUrl: './text-review-modal.component.scss',
  animations: [easeOutOpacityAnimation],
})
export class TextReviewModalComponent {
  @Input() text?: string;
  @Input() title?: string;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.setStatusTextReviewModal(false, '', '');
  }
}
