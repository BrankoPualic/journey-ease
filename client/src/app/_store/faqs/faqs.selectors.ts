import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFaqs = (state: AppState) => state.faqs;

export const selectAllFaqs = createSelector(selectFaqs, (state) => state.faqs);
