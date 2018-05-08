export class PageContainer<T> {
  from: number;
  size: number;
  total: number;
  list: T[];

  constructor(list: T[]) {
    this.list = list;
    this.size = this.total = list.length;
  }

}
