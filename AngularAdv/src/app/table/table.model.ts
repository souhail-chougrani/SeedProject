export class TableModel {
  dataSearch?: object;
  OrderBy?: { OrderBy: { column: string; direction: string } };
  paginate?: { start: number; count: number };
}
