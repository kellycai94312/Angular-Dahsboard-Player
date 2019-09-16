import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgxScrollDirective} from '../ngx-scroll/ngx-scroll.directive';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {Direction} from '../model/direction';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {Mutex} from '../../../data/local/mutex';
import {AppHelper} from '../../../utils/app-helper';
import {PropertyConstant} from '../../../data/local/property-constant';

export class NgxVirtualScroll {

  @ViewChild(NgxScrollDirective, { static: false })
  public ngxScrollDirective: NgxScrollDirective;

  @Input()
  public class: string;

  @Input()
  public query: PageQuery;

  @Input()
  public getItems: (direction: Direction, pageQuery: PageQuery) => Promise<PageContainer<any>>;

  @Input()
  public from: number;

  @Input()
  public count: number;

  @Input()
  public autoScroll: boolean;

  @Input()
  public windowScroll: boolean;

  public items: any[];

  @Output()
  public afterUpdateItems: EventEmitter<void>;

  public upBusy: boolean;
  public downBusy: boolean;

  private _rear?: number;
  private _rearCount?: number;
  private _front?: number;
  private _total: number;

  private readonly _mutex: Mutex;

  constructor(private _appHelper: AppHelper) {
    this._mutex = new Mutex();
    this.query = new PageQuery();

    this.class = '';
    this.afterUpdateItems = new EventEmitter<void>();

    this.initialize();
  }

  public async addItem(item: any, scroll: boolean = false) {
    if (!this._front) {
      this._front = 0;
      this._total = 0;
    }
    // TODO: Add increment to total and front

    this.items.push(item);
    if (scroll) {
      await this.scrollDown();
    }
  }

  //#region Scroll

  public async onScrollUp() {
    if (!this.getItems || !this._rear) {
      return;
    }

    this.upBusy = true;

    this._rear = this._rear - this.count;
    this._rearCount = this.count;
    if (this._rear < 0) {
      this._rearCount = this._rear + this.count;
      this._rear = 0;
    }
    this.query.from = this.updateRear();
    this.query.count = this._rearCount;

    try {
      const pageContainer: PageContainer<any> = await this.getItems(Direction.UP, this.query);
      if (!pageContainer) {
        return;
      }

      this._total = pageContainer.total;
      for (let i = pageContainer.list.length - 1; i >= 0; i--) {
        this.items.unshift(pageContainer.list[i]);
      }
      // TODO: Calc item height
      this.ngxScrollDirective.scrollTo(98 * pageContainer.size);

      this.afterUpdateItems.emit();
    } finally {
      this.upBusy = false;
    }
  }

  public async onScrollDown(): Promise<boolean> {
    if (!this.canScrollDown()) {
      return false;
    }

    this.downBusy = true;
    if (!this.query.from) {
      delete this.query.from;
    }
    this.query.count = this.count;

    try {
      const pageContainer: PageContainer<any> = await this.getItems(Direction.DOWN, this.query);
      if (!pageContainer) {
        return false;
      }

      this._total = pageContainer.total;
      this.query.from = pageContainer.from;

      this.updateRear();

      for (let i = 0; i < pageContainer.list.length; i++) {
        this.items.push(pageContainer.list[i]);
      }

      this._front = pageContainer.from + this.count;
      if (this._total < this._front) {
        this._front = this._total;
      }
      this.query.from = this._front;

      this.afterUpdateItems.emit();
    } catch (e) {
      return false;
    } finally {
      this.downBusy = false;
    }
    return true;
  }

  public async scrollDown() {
    await this._appHelper.delay();
    this.ngxScrollDirective.scrollToDown();
  }

  //#endregion

  public canScrollDown(): boolean {
    return this.getItems && this._front != this._total;
  }

  public async reset(): Promise<void> {
    await this._mutex.acquire();
    this.initialize();

    // This need to activate scroll
    do {
      if (!(await this.onScrollDown())) {
        break;
      }
    } while (this.canScrollDown() && this.ngxScrollDirective.getHeight() <= this.ngxScrollDirective.getViewPortHeight());

    if (this.autoScroll) {
      await this.scrollDown();
    }

    this._mutex.release();
  }

  private initialize() {
    this.count = PropertyConstant.pageSize;
    this.query.count = this.count;
    delete this.query.from;

    this._rear = Number.MAX_VALUE;
    this._rearCount = this.count;
    this._front = 0;
    this._total = Number.MIN_VALUE;
    this.items = [];
  }

  private updateRear(): number {
    if (this.query.from || this.query.from == 0) {
      this._rear = Math.min(this._rear, this.query.from);
    }
    return this._rear;
  }

}
