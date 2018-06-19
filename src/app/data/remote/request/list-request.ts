export class ListRequest<T> {
  list: T[];

  constructor(list: T[]) {
    this.list = list;
  }

}
