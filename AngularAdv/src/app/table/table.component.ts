import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LoginService } from '../login/login.service';
import { TableService } from './table.service';
import { ColumnsTable } from './Table-utils';
import { merge } from 'rxjs';
import { switchMap, map, startWith, tap } from 'rxjs/operators';
import { AppState } from '../core/core.state';
import { Store } from '@ngrx/store';
import * as TABLE from '../core/table/table.actions';
import { selectTable } from '../core/table/table.reducer';
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
  OrderBy: { OrderBy: { column: string; direction: string } };
  paginate: { start: number; count: number };

  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // this.getData().subscribe((res: any) => (this.dataSource.data = res));

    this.getData().subscribe();
    this.store
      .select(selectTable)
      .pipe(tap(e => console.log(e)))
      .subscribe();
  }

  getData() {
    const mappingSort = map((el: any) => {
      this.OrderBy = {
        OrderBy: { column: el.active, direction: el.direction }
      };
    });
    const mappingPaginator = map((e: any) => {
      this.paginate = {
        start: e.pageIndex * 10,
        count: e.pageSize
      };
    });
    return merge(
      this.sort.sortChange.pipe(mappingSort),
      this.paginator.page.pipe(mappingPaginator)
    ).pipe(
      tap(() =>
        this.store.dispatch(
          new TABLE.LoadTables({
            dataSearch: {},
            OrderBy: this.OrderBy,
            paginate: this.paginate
          })
        )
      )
    );
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
}
