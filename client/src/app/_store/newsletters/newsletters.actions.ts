import { createAction, props } from '@ngrx/store';

// INSERT
export const addSubscription = createAction(
  '[Footer] Add Subscription',
  props<{ email: string }>()
);

// SAVING
export const saveSubscriptionsSuccess = createAction(
  '[Footer] Save Subscriptions Success'
);

export const saveSubscriptionsFailure = createAction(
  '[Footer] Save Subscriptions Failure',
  props<{ error: string }>()
);
