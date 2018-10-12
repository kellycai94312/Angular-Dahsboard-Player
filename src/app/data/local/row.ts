export class Row<TRow, TColumn> {
  public row: TRow;
  public columns: TColumn[];

  constructor() {
    this.columns = [];
  }
}
