import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Season } from '../_types/season.type';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private dataSerivce: DataService) {}

  getSeasons(): Observable<Season[]> {
    return this.dataSerivce.get('seasons');
  }
}
