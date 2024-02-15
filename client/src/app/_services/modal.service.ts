import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeTextReviewModal = new BehaviorSubject<boolean>(false);
  activeTextReviewModal$ = this.activeTextReviewModal.asObservable();
  private activeTextReviewModalContent = new BehaviorSubject<string[]>([]);
  activeTextReviewModalContent$ =
    this.activeTextReviewModalContent.asObservable();

  private activePhotoModal = new BehaviorSubject<boolean>(false);
  activePhotoModal$ = this.activePhotoModal.asObservable();
  private activePhotoModalImages = new BehaviorSubject<string[]>([]);
  activePhotoModalImages$ = this.activePhotoModalImages.asObservable();

  private activeTextEditingModal = new BehaviorSubject<boolean>(false);
  activeTextEditingModal$ = this.activeTextEditingModal.asObservable();
  private textEditingModalMap = new BehaviorSubject<Map<string, string>>(
    new Map<string, string>()
  );
  textEditingModalMap$ = this.textEditingModalMap.asObservable();
  private setKeyAsToWhatAreYouEditing = new BehaviorSubject<string>('');
  setKeyAsToWhatAreYouEditing$ =
    this.setKeyAsToWhatAreYouEditing.asObservable();

  setStatusTextReviewModal(status: boolean, title: string, text: string) {
    this.activeTextReviewModalContent.next([title, text]);
    this.activeTextReviewModal.next(status);
  }

  setStatusPhotoModal(status: boolean, imagesArray: string[]) {
    this.activePhotoModalImages.next(imagesArray);
    this.activePhotoModal.next(status);
  }

  setStatusTextEditingModal(status: boolean, key: string, value: string) {
    const currentMap = new Map<string, string>(
      this.textEditingModalMap.getValue()
    );

    currentMap.set(key, value);
    this.textEditingModalMap.next(currentMap);

    this.activeTextEditingModal.next(status);
  }

  clearTextEditingModalMap() {
    const emptyMap = new Map<string, string>();
    this.textEditingModalMap.next(emptyMap);
  }

  setKeyWhatIsEdited(key: string) {
    this.setKeyAsToWhatAreYouEditing.next(key);
  }
}
