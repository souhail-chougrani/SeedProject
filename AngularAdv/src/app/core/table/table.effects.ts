import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { TableActionTypes, TableActions } from './table.actions';


@Injectable()
export class TableEffects {


  @Effect()
  loadTables$ = this.actions$.pipe(
    ofType(TableActionTypes.LoadTables),
     
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<TableActions>) {}

}
