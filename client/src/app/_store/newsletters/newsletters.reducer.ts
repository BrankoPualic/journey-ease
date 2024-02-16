import { UnionStatus } from '../../_types/shared.types';
import { createReducer, on } from '@ngrx/store';
import {
  addSubscription,
  saveSubscriptionsFailure,
  saveSubscriptionsSuccess,
} from './newsletters.actions';

export type SubscriptionState = {
  subscription: boolean;
  error: string | null;
  status: UnionStatus;
};

export const initialState: SubscriptionState = {
  subscription: false,
  error: null,
  status: 'pending',
};

export const subscriptionReducer = createReducer(
  initialState,

  on(addSubscription, (state) => ({
    ...state,
    subscription: state.subscription,
  })),

  on(saveSubscriptionsSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success' as const,
  })),

  on(saveSubscriptionsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
