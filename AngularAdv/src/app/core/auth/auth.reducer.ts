import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../core.state';

export const initialState: AuthState = {
  isAuthenticated: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
