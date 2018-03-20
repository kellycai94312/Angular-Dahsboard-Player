export class PageContainer<T> {
  size: number;
  total: number;
  list: T[];

  constructor(list: T[]) {
    this.list = list;
    this.size = this.total = list.length;
  }

}
