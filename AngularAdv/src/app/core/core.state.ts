import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.models';
import { TableReducer } from './table/table.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  table: TableReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];
{
}

export interface AppState {}
