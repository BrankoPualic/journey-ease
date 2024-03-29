import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, HasRoleDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isHomePage = false;
  authDropdownIsOpened = false;
  aboutUsDropdownIsOpened = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => (this.isHomePage = this.router.url === '/'));
  }

  signout() {
    this.authDropdownIsOpened = false;
    this.authService.signout();
  }
}
