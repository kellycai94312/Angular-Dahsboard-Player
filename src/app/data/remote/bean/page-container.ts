import {Exclude, Type} from 'class-transformer';

export class PageContainer<T> {

  public from: number;
  public size: number;
  public total: number;

  @Type(options => (options.newObject as PageContainer<T>)._type)
  public list: T[];

  @Exclude()
  private readonly _type: Function;

  constructor(type?: Function) {
    this._type = type;
  }

}
