import {PageQuery} from '../../../remote/rest-api/page-query';
import {AfterViewInit, Input} from '@angular/core';
import {PropertyConstant} from '../../property-constant';

export class InfinityList<T, TQuery extends PageQuery> implements AfterViewInit {

  private _total: number;

  @Input()
  public query: TQuery;

  @Input()
  public getItems: Function;

  @Input()
  public items: Array<T>;

  protected rear: number;

  constructor() {
    this._total = 0;
    this.query = <TQuery>{
      name: '',
      from: 0,
      count: PropertyConstant.pageSize
    };
    this.rear = Number.MAX_VALUE;
    this.items = [];
  }

  ngAfterViewInit(): void {
  }

  public async initialize(): Promise<void> {
    this.items = [];
    await this.update(true);
  }

  public async update(withReset: boolean = false): Promise<boolean> {
    if (!this.getItems) {
      return false;
    }
    if (withReset) {
      this._total = 0;
      this.query.from = 0;
    }

    try {
      const pageContainer = await this.getItems(this.query);
      if (pageContainer) {
        if (this._total != pageContainer.total || pageContainer.total < 1) {
          this.query.from = pageContainer.from;
          this.items = [];
        }

        if (this.query.from < this._total) {
          this.query.from += this.query.count;
        }

        for (let i = 0; i < pageContainer.list.length; i++) {
          this.items.push(pageContainer.list[i]);
        }
        this._total = pageContainer.total;
      } else {
        this._total = 0;
        this.query.from = 0;
      }

      if (!this.query.from) {
        this.rear = 0;
      } else {
        this.rear = Math.min(this.rear, this.query.from);
      }
    } catch (e) {
      return false;
    }
    return true;
  }

}
