import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
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
import { SubscriptionEffects } from './_store/newsletters/newsletters.effects';
import { subscriptionReducer } from './_store/newsletters/newsletters.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';


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
      subscription: subscriptionReducer,
    }),
    provideEffects([
      CountryEffects,
      DestinationEffects,
      BlogEffects,
      FaqEffects,
      SubscriptionEffects,
    ]),
    provideAnimations(),
  ],
};
