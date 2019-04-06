import { TableActions, TableActionTypes } from './table.actions';
import { AppState } from 'src/app/core/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableModel } from 'src/app/table/table.model';

export interface State extends AppState {
  dataSearch?: object;
  OrderBy?: { OrderBy: { column: string; direction: string } };
  paginate?: { start: number; count: number };
}

export const initialState: State = {
  dataSearch: undefined,
  OrderBy: undefined,
  paginate: { start: 0, count: 10 }
};

export function TableReducer(
  state = initialState,
  action: TableActions
): State {
  switch (action.type) {
    case TableActionTypes.LoadTables:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export const selectTableState = createFeatureSelector<AppState>('table');
export const selectTable = createSelector(
  selectTableState,
  (state: State) => state
);
