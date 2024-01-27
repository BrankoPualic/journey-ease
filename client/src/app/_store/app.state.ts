import { BlogState } from './blog/blog.reducer';
import { CountryState } from './countries/countries.reducer';
import { SeasonState } from './destinations/destinations.reducer';

export type AppState = {
  countries: CountryState;
  seasons: SeasonState;
  blog: BlogState;
};
