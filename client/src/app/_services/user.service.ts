import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  addSubscription(email: string): Observable<{ message: string }> {
    return this.dataService.post({ email }, 'newsletterSubscription');
  }
}
