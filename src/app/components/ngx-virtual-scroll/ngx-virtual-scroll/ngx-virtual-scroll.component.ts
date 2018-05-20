import {AfterContentInit, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Direction} from '../model/direction';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {NgxScrollDirective} from '../ngx-scroll/ngx-scroll.directive';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PropertyConstant} from '../../../data/local/property-constant';

@Component({
  selector: 'ngx-virtual-scroll',
  templateUrl: './ngx-virtual-scroll.component.html',
  styleUrls: ['./ngx-virtual-scroll.component.scss']
})
export class NgxVirtualScrollComponent implements OnInit, AfterContentInit {

  @ContentChild(TemplateRef)
  public templateRef: TemplateRef<any>;

  @ViewChild(NgxScrollDirective)
  public ngxScrollDirective: NgxScrollDirective;

  @Input()
  public query: PageQuery;

  @Input()
  public getItems: Function;

  @Input()
  public from: number;

  @Input()
  public count: number;

  @Input()
  public autoScroll: boolean;

  public isBusy: boolean;
  public items: Array<any>[];

  private _rear?: number;
  private _rearCount?: number;
  private _front?: number;
  private _total: number;

  constructor() {
    this.count = PropertyConstant.pageSize;
    this.items = [];
  }

  ngOnInit() {
  }

  async ngAfterContentInit(): Promise<void> {
    await this.reset();
  }

  public addItem(item: any) {
    if (!this._front) {
      this._front = 0;
      this._total = 0;
    }
    // TODO: Add increment to total and front

    this.items.push(item);
  }

  //#region Scroll

  public async onScrollUp() {
    if (!this.getItems || !this._rear || !this.query.from) {
      return;
    }

    this.isBusy = true;

    this._rear = Math.min(this._rear, this.query.from);
    this.query.from = this._rear;
    this.query.count = this.count;

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
      this.ngxScrollDirective.scrollTo(65 * pageContainer.size);


      this._rear = this._rear - this.count;
      if (this._rear < 0) {
        this._rearCount = this._rear + this.count;
        this._rear = 0;
      }
    } finally {
      this.isBusy = false;
    }
  }

  public async onScrollDown() {
    if (!this.getItems || this._front == this._total) {
      return;
    }

    this.isBusy = true;

    if (this.query.from) {
      this.query.from = this._front;
    }
    this.query.count = this.count;

    try {
      const pageContainer: PageContainer<any> = await this.getItems(Direction.DOWN, this.query);
      if (!pageContainer) {
        return;
      }

      this._total = pageContainer.total;
      this.query.from = pageContainer.from;

      for (let i = 0; i < pageContainer.list.length; i++) {
        this.items.push(pageContainer.list[i]);
      }

      this._front = pageContainer.from + this.count;
      if (this._total < this._front) {
        this._front = this._total;
      }

    } finally {
      this.isBusy = false;
    }
  }

  public scrollDown() {
    setTimeout(() => {
      this.ngxScrollDirective.scrollToDown();
    });
  }

  //#endregion

  public async reset(): Promise<void> {
    this._rear = Number.MAX_VALUE;
    this._rearCount = this.count;
    this._front = 0;
    this._total = Number.MIN_VALUE;
    this.items = [];

    await this.onScrollDown();
  }

}
