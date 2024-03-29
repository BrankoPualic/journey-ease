import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { countryReducer } from './_store/countries/countries.reducer';
import { CountryEffects } from './_store/countries/countries.effects';
import { DestinationEffects } from './_store/destinations/destinations.effects';
import { seasonReducer } from './_store/destinations/destinations.reducer';
import { BlogEffects } from './_store/blog/blog.effects';
import { blogReducer } from './_store/blog/blog.reducer';
import { FaqEffects } from './_store/faqs/faqs.effects';
import { faqReducer } from './_store/faqs/faqs.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authReducer } from './_store/auth/auth.reducer';
import { AuthEffects } from './_store/auth/auth.effects';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { commentReducer } from './_store/comments/comments.reducer';
import { CommentEffects } from './_store/comments/comments.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({
      countries: countryReducer,
      seasons: seasonReducer,
      blog: blogReducer,
      faqs: faqReducer,
      auth: authReducer,
      comments: commentReducer,
    }),
    provideEffects([
      CountryEffects,
      DestinationEffects,
      BlogEffects,
      FaqEffects,
      AuthEffects,
      CommentEffects,
    ]),
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
};
