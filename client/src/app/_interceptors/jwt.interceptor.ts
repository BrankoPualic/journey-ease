import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  inject(AuthService)
    .currentUser$.pipe(take(1))
    .subscribe({
      next: (user) => {
        if (user)
          req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${user.token}`),
          });
      },
    });
  return next(req);
};
