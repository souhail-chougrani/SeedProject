import { TableActions, TableActionTypes } from './table.actions';
import { AppState } from 'src/app/core/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableModel } from 'src/app/table/table.model';

export interface State extends AppState {
  data: any[];
  dataSearch?: object;
  OrderBy?: { OrderBy: { column: string; direction: string } };
  paginate?: { start: number; count: number };
  error: string;
}

export const initialState: State = {
  data: [],
  dataSearch: undefined,
  OrderBy: { OrderBy: { column: null, direction: null } },
  paginate: { start: 0, count: 10 },
  error: ''
};

export function TableReducer(
  state = initialState,
  action: TableActions
): State {
  switch (action.type) {
    case TableActionTypes.LoadSuccess:
      return { ...state, ...{ data: action.payload } };
    case TableActionTypes.LoadFaild:
      return { ...state, ...{ error: action.payload } };
    case TableActionTypes.Sort:
      return { ...state, ...{ OrderBy: action.payload } };
    case TableActionTypes.Paginate:
      return { ...state, ...{ paginate: action.payload } };

    default:
      return state;
  }
}

export const selectTableState = createFeatureSelector<AppState>('table');
export const selectTable = createSelector(
  selectTableState,
  (state: State) => state
);
export const selectData = createSelector(
  selectTable,
  (state: State) => state.data
);
export const selectError = createSelector(
  selectTable,
  (state: State) => state.error
);
export const selectOrderBy = createSelector(
  selectTable,
  (state: State) => state.OrderBy
);
export const selectPaginate = createSelector(
  selectTableState,
  (state: State) => state.paginate
);
