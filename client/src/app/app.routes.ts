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
      {
        path: 'admin',
        loadComponent: () =>
          import('./admin/admin.component').then((m) => m.AdminComponent),
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./admin/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
              ),
          },
          {
            path: 'countries-and-places',
            loadComponent: () =>
              import(
                './admin/countries-and-places/countries-and-places.component'
              ).then((m) => m.CountriesAndPlacesComponent),
          },
          {
            path: 'faqs',
            loadComponent: () =>
              import('./admin/faqs/faqs.component').then(
                (m) => m.FaqsComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
