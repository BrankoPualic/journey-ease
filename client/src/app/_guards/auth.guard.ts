import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          this.router.navigateByUrl('/auth/sign-in');
          return false;
        }
      })
    );
  }
}
