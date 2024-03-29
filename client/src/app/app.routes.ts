import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { blogResolver } from './_resolvers/blog.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'auth/:type',
        loadComponent: () =>
          import('./auth/auth.component').then((m) => m.AuthComponent),
      },
      {
        path: 'blog',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./blog/blog.component').then((m) => m.BlogComponent),
            pathMatch: 'full',
            resolve: { blogData: blogResolver },
          },
          {
            path: 'post/:id',
            loadComponent: () =>
              import('./blog/post/post.component').then((m) => m.PostComponent),
          },
        ],
      },
      {
        path: 'faqs',
        loadComponent: () =>
          import('./faqs/faqs.component').then((m) => m.FaqsComponent),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./account-profile/account-profile.component').then(
            (m) => m.AccountProfileComponent
          ),
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
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
          {
            path: 'blog',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./admin/admin-blog/admin-blog.component').then(
                    (m) => m.AdminBlogComponent
                  ),
                pathMatch: 'full',
              },
              {
                path: 'comments',
                loadComponent: () =>
                  import(
                    './admin/admin-blog/admin-post-comments/admin-post-comments.component'
                  ).then((m) => m.AdminPostCommentsComponent),
              },
            ],
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
