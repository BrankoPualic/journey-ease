import { AuthState } from './auth/auth.reducer';
import { BlogState } from './blog/blog.reducer';
import { CountryState } from './countries/countries.reducer';
import { SeasonState } from './destinations/destinations.reducer';
import { FaqState } from './faqs/faqs.reducer';

export type AppState = {
  countries: CountryState;
  seasons: SeasonState;
  blog: BlogState;
  faqs: FaqState;
  subscriptions: SubscriptionState;
  auth: AuthState;
};
