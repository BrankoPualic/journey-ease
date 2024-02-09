import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Faq } from '../_types/shared.types';

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  constructor(private dataService: DataService) {}

  getFaqs(): Observable<Faq[]> {
    return this.dataService.get('faq');
  }
}
