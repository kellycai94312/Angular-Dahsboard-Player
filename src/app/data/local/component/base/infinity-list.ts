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

  protected rear?: number;

  // TODO: Needed for don't duplicates items in infinity list
  protected initialized: boolean;

  constructor() {
    this._total = 0;
    this.query = <TQuery>{
      name: '',
      count: PropertyConstant.pageSize
    };
    this.items = [];
  }

  ngAfterViewInit(): void {
  }

  public async initialize(): Promise<void> {
    this.initialized = false;
    this.items = [];
    await this.update(true);
    this.initialized = true;
  }

  public async update(withReset: boolean = false): Promise<boolean> {
    if (!this.getItems) {
      return false;
    }
    if (withReset) {
      this.resetFilter();
    }

    try {
      const pageContainer = await this.getItems(this.query);
      if (pageContainer) {
        this.query.from = pageContainer.from;
        if (this._total != pageContainer.total || pageContainer.total < 1) {
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
        this.resetFilter();
      }

      if (!this.query.from) {
        this.rear = null;
        this.rear = Number.MAX_VALUE;
      } else {
        if (this.rear) {
          this.rear = Math.min(this.rear, this.query.from);
        } else {
          this.rear = this.query.from;
        }
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  private resetFilter(): void {
    this.rear = null;
    this._total = 0;
    delete this.query.from;
  }

}
