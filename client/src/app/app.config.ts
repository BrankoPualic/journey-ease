import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { countryReducer } from './_store/countries/countries.reducer';
import { CountryEffects } from './_store/countries/countries.effects';
import { BlogEffects } from './_store/blog/blog.effects';
import { blogReducer } from './_store/blog/blog.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({ countries: countryReducer, blog: blogReducer }),
    provideEffects([CountryEffects, BlogEffects]),
  ],
};
