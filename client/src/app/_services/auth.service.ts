import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DataService } from './data.service';
import { User, UserSigninCred, UserSignupCred } from '../_types/auth.types';
import { map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  signin(cred: UserSigninCred) {
    return this.dataService.post<User>(cred, 'auth/signin').pipe(
      map((user) => {
        if (user) this.setCurrentUser(user);
      })
    );
  }
  signup(cred: UserSignupCred) {
    return this.dataService.post<User>(cred, 'auth/signup').pipe(
      map((user) => {
        if (user) this.setCurrentUser(user);
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
  }

  signout() {
    localStorage.removeItem('user');
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  isSignedIn(): boolean {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('user') !== null
      : false;
  }
}
