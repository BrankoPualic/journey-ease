import { createReducer, on } from '@ngrx/store';
import { Faq, UnionStatus } from '../../_types/shared.types';
import { loadFaqs, loadFaqsFailure, loadFaqsSuccess } from './faqs.actions';

export type FaqState = {
  faqs: Faq[];
  error: string | null;
  status: UnionStatus;
};

export const initialState: FaqState = {
  faqs: [],
  error: null,
  status: 'pending',
};

export const faqReducer = createReducer(
  initialState,

  on(loadFaqs, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadFaqsSuccess, (state, { faqs }) => ({
    ...state,
    faqs,
    error: null,
    status: 'success' as const,
  })),

  on(loadFaqsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
