import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private router: Router) {}

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 400:
        if (error.error.errors) {
          const modelStateErrors = [];
          for (const key in error.error.errors) {
            if (error.error.errors[key])
              modelStateErrors.push(error.error.errors[key]);
          }
          throw modelStateErrors.flat();
        } else console.error(error.error, error.status.toString());
        break;
      case 401:
        console.error('Unauthorised', error.status.toString());
        break;
      case 404:
        this.router.navigateByUrl('/not-found');
        break;
      case 500:
        const navigationExtras: NavigationExtras = {
          state: { error: error.error },
        };
        this.router.navigateByUrl('/server-error', navigationExtras);
        break;
      default:
        console.error('Something unexpected went wrong', error);
        break;
    }
    return throwError(() => new Error(error.message));
  }
}
