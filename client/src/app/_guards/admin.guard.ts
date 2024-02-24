import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigateByUrl('/');
          return false;
        }
        if (user.roles.includes('Admin') || user.roles.includes('Moderator'))
          return true;
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
