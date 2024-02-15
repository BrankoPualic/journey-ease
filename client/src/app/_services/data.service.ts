import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: object) {
    return this.http.get<T>(this.baseUrl + url, options);
  }

  post<T>(data: any, url: string) {
    return this.http.post<T>(this.baseUrl + url, data);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.baseUrl + url);
  }

  patch<T>(data: any, url: string) {
    return this.http.patch<T>(this.baseUrl + url, data);
  }
}
