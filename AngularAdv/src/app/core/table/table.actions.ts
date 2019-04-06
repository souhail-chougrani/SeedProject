import { Action } from '@ngrx/store';
import { TableModel } from 'src/app/table/table.model';

export enum TableActionTypes {
  LoadTables = '[Table] Load Tables',
  FetchData = '[Table] Fetch  Table'
}

export class FetchData implements Action {
  readonly type = TableActionTypes.FetchData;
  constructor(public payload: any[]) {}
}
export class LoadTables implements Action {
  readonly type = TableActionTypes.LoadTables;
  constructor(public payload: TableModel) {}
}

export type TableActions = LoadTables;
