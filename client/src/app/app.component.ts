import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { AuthService } from './_services/auth.service';
import { UserAuthorized } from './_types/auth.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showHeaderFooter = true;
  currentUser: UserAuthorized | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = !this.isAdminRoute();
      }
    });

    this.authService.isSignedIn();
    this.currentUser = this.authService.getCurrentUser();
    this.authService.setCurrentUserSubject(this.currentUser);
  }

  private isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
