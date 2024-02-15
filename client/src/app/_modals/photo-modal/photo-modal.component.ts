import { Component, Input } from '@angular/core';
import { easeOutOpacityAnimation } from '../../_animations/modal-animations';
import { ModalService } from '../../_services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-modal.component.html',
  styleUrl: './photo-modal.component.scss',
  animations: [easeOutOpacityAnimation],
})
export class PhotoModalComponent {
  @Input() imagesArray: string[] = [];
  selectedIndex = 0;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.setStatusPhotoModal(false, []);
  }

  selectImage(index: number) {}
}
