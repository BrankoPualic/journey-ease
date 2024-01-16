import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Country, Season } from '../_types/shared.types';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private dataSerivce: DataService) {}

  getSeasons(): Observable<Season[]> {
    return this.dataSerivce.get('seasons');
  }

  getCountries(): Observable<Country[]> {
    return this.dataSerivce.get('country');
  }

  addCountry(countryName: string): Observable<{ message: string }> {
    return this.dataSerivce.post({ countryName }, 'country');
  }
}
