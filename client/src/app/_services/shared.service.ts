import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  // ADMIN
  getObjKeys<T extends object>(obj: T): string[] {
    return this.transformKeys(Object.keys(obj));
  }

  private transformKeys(keys: string[]): string[] {
    return keys.map((key) => this.capitalizeFirstLetterAndAddSpace(key));
  }

  private capitalizeFirstLetterAndAddSpace(key: string): string {
    const words = key.split(/(?=[A-Z])/);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    return words.join(' ');
  }

  addActiveClassAdmin(el: HTMLElement) {
    el.classList.add('admin-tab-active');
  }

  removeActiveClassAdmin(el: HTMLElement) {
    el.classList.remove('admin-tab-active');
  }

  // =======================================
}
