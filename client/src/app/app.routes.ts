import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

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
        path: 'blog',
        loadComponent: () =>
          import('./blog/blog.component').then((m) => m.BlogComponent),
      },
      {
        path: 'faqs',
        loadComponent: () =>
          import('./faqs/faqs.component').then((m) => m.FaqsComponent),
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
              import('./admin/admin-faqs/admin-faqs.component').then(
                (m) => m.AdminFaqsComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('./errors/server-error/server-error.component').then(
        (m) => m.ServerErrorComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    pathMatch: 'full',
  },
];
