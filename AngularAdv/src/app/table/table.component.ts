import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSortable,
  SortDirection
} from '@angular/material';
import { LoginService } from '../login/login.service';
import { TableService } from './table.service';
import { ColumnsTable } from './Table-utils';
import { merge } from 'rxjs';
import { switchMap, startWith, tap, skip, map, take } from 'rxjs/operators';
import { AppState } from '../core/core.state';
import { Store, select } from '@ngrx/store';
import * as TABLE from '../core/table/table.actions';
import {
  selectTable,
  selectOrderBy,
  selectPaginate,
  selectData,
  selectOrderByPagination
} from '../core/table/table.reducer';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ColumnsTable;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 10000;
  isLoadingResults = false;
  // selection = new SelectionModel<PeriodicElement>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${
  //     this.selection.isSelected(row) ? 'deselect' : 'select'
  //   } row ${row.position + 1}`;
  // }
  constructor(
    private tableService: TableService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    merge(
      this.sort.sortChange.pipe(
        tap(e => {
          this.store.dispatch(
            new TABLE.Sort({
              OrderBy: { column: e.active, direction: e.direction }
            })
          ),
            this.store.dispatch(
              new TABLE.Paginate({
                start: 0,
                count: 10
              })
            );
        })
      ),
      this.paginator.page.pipe(
        tap(e =>
          this.store.dispatch(
            new TABLE.Paginate({
              start: e.pageIndex * 10,
              count: e.pageSize
            })
          )
        )
      )
    ).subscribe();
    this.store
      .select(selectOrderByPagination)
      .pipe(
        tap(e => {
          this.sort.active = e.OrderBy.OrderBy.column;
          this.sort.direction = <SortDirection>e.OrderBy.OrderBy.direction;
          this.paginator.pageIndex = e.paginate.start / 10;
          this.paginator.pageSize = e.paginate.count;
        }),
        switchMap(e => this.tableService.getData(e.OrderBy.OrderBy, e.paginate))
      )
      .subscribe((res: any) => (this.dataSource.data = res.result));
  }

  getData() {
    // startWith({})
    //   switchMap(() => {
    //     this.isLoadingResults = true;
    //     return this.tableService.getData(this.paginate, this.OrderBy);
    //   }),
    //   map((data: any) => {
    //     this.isLoadingResults = false;
    //     this.resultsLength = data.count;
    //     return data.result;
    //   })
    // );
  }

  paginnation() {}
}
export class OrderBy {
  OrderBy: { column: string; direction: string };
}
export class Paginate {
  start: number;
  count: number;
}
