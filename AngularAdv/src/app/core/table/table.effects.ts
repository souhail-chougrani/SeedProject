import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map, tap, catchError } from 'rxjs/operators';
import { EMPTY, empty, of } from 'rxjs';
import { TableActionTypes, TableActions } from './table.actions';
import { TableService } from 'src/app/table/table.service';
import { dispatch } from 'rxjs/internal/observable/pairs';
import * as TABLE from './table.actions';
@Injectable()
export class TableEffects {
  @Effect()
  loadTables$ = this.actions$.pipe(
    ofType(TableActionTypes.LoadTable),
    switchMap(_ =>
      this.tableService.getData().pipe(
        tap(e => console.log('form Effect')),
        map((e: any[]) => new TABLE.LoadSuccess(e))
      )
    ),
    catchError(err => of(new TABLE.LoadFaild('error in loading data')))
  );

  constructor(
    private actions$: Actions<TableActions>,
    private tableService: TableService
  ) {}
}
