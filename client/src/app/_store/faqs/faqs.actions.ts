import { createAction, props } from '@ngrx/store';
import { Faq } from '../../_types/shared.types';

// LOAD
export const loadFaqs = createAction('[Faqs] Load Faqs');

export const loadFaqsSuccess = createAction(
  '[Faqs] Faqs Load Success',
  props<{ faqs: Faq[] }>()
);

export const loadFaqsFailure = createAction(
  '[Faqs] Faqs Load Failure',
  props<{ error: string }>()
);
