import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DataService } from './data.service';
import {
  UserAuthorized,
  UserSigninCred,
  UserSignupCred,
} from '../_types/auth.types';
import { BehaviorSubject, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<UserAuthorized | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  signin(cred: UserSigninCred) {
    return this.dataService.post<UserAuthorized>(cred, 'account/signin').pipe(
      map((user) => {
        if (user) this.setCurrentUser(user);
        return user;
      })
    );
  }
  signup(cred: UserSignupCred) {
    return this.dataService.post<UserAuthorized>(cred, 'account/signup').pipe(
      map((user) => {
        if (user) this.setCurrentUser(user);
        return user;
      })
    );
  }

  setCurrentUser(user: UserAuthorized) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.router.navigateByUrl('/');
  }

  setCurrentUserSubject(user: UserAuthorized | null) {
    this.currentUserSource.next(user);
  }

  signout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  isSignedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user') ?? null;
      if (user == null) return false;

      const decodedToken = this.getDecodedToken(JSON.parse(user).token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        this.signout();
        return false;
      }

      return true;
    }

    return false;
  }

  getCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user !== null) return JSON.parse(user);
      return null;
    }
  }
}
