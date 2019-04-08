import {Exclude, Type} from 'class-transformer';

export class PageContainer<T> {
  from: number;
  size: number;
  total: number;

  @Type(options => {
    return (options.newObject as PageContainer<T>).type;
  })
  list: T[];

  @Exclude()
  private type: Function;

  constructor(type?: Function) {
    this.type = type;
  }
}
