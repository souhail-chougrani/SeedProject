import { Action } from '@ngrx/store';
import { TableModel } from 'src/app/table/table.model';

export enum TableActionTypes {
  LoadTable = '[Table API] Load Data',
  LoadSuccess = '[Table API] Load Success',
  LoadFaild = '[Table API] Load Faild',
  Sort = '[Table API] Sort Table',
  Paginate = '[Table API] Pagination'
}

export class LoadTable implements Action {
  readonly type = TableActionTypes.LoadTable;
}
export class LoadSuccess implements Action {
  readonly type = TableActionTypes.LoadSuccess;
  constructor(public payload: any[]) {}
}
export class LoadFaild implements Action {
  readonly type = TableActionTypes.LoadFaild;
  constructor(public payload: string) {}
}
export class Sort implements Action {
  readonly type = TableActionTypes.Sort;
  constructor(
    public payload: { OrderBy: { column: string; direction: string } }
  ) {}
}
export class Paginate implements Action {
  readonly type = TableActionTypes.Paginate;
  constructor(public payload: { start: number; count: number }) {}
}

export type TableActions =
  | LoadTable
  | LoadSuccess
  | LoadFaild
  | Sort
  | Paginate;
