import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  addSubscription(email: string) {
    return this.dataService.post({ email }, 'newsletterSubscription');
  }
}
