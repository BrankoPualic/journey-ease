import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'auth/:type',
        loadComponent: () =>
          import('./auth/auth.component').then((m) => m.AuthComponent),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
