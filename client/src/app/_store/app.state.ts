import { BlogState } from './blog/blog.reducer';
import { CountryState } from './countries/countries.reducer';

export type AppState = {
  countries: CountryState;
  blog: BlogState;
};
