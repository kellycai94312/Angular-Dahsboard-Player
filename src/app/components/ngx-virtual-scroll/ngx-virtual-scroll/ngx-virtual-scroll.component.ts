import {AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {Direction} from '../model/direction';
import {PageContainer} from '../../../data/remote/bean/page-container';

@Component({
  selector: 'ngx-virtual-scroll',
  templateUrl: './ngx-virtual-scroll.component.html',
  styleUrls: ['./ngx-virtual-scroll.component.scss']
})
export class NgxVirtualScrollComponent implements OnInit, AfterViewInit {

  @ContentChild(TemplateRef)
  public templateRef: TemplateRef<any>;

  @Input()
  public query: Query;

  @Input()
  public items: Array<any>[];

  @Input()
  public getItems: Function;

  public isBusy: boolean;

  private _rear?: number;
  private _rearCount?: number;
  private _front?: number;
  private _total: number;

  constructor() {
    this.reset();
  }

  async ngOnInit() {
  }

  async ngAfterViewInit(): Promise<void> {
    this._rearCount = this.query.count;

    await this.onScrollDown();
  }

  public async onScrollUp() {
    if (!this.getItems || !this._rear) {
      return;
    }

    this.isBusy = true;
    this._rear = Math.min(this._rear, this.query.from);

    try {
      const pageContainer: PageContainer<any> = await this.getItems(Direction.UP, {from: this._rear, count: this._rearCount});
      if (!pageContainer) {
        return;
      }

      this._total = pageContainer.total;

      for (let i = pageContainer.list.length - 1; i >= 0; i--) {
        this.items.unshift(pageContainer.list[i]);
      }

      this._rear = this._rear - this.query.count;
      if (this._rear < 0) {
        this._rearCount = this._rear + this.query.count;
        this._rear = 0;
      }
    } finally {
      this.isBusy = true;
    }
  }

  public async onScrollDown() {
    if (!this.getItems || this._front == this._total) {
      return;
    }

    this.isBusy = true;
    this._front = Math.max(this._front, this.query.from);

    try {
      const pageContainer: PageContainer<any> = await this.getItems(Direction.DOWN, {from: this._front, count: this.query.count});
      if (!pageContainer) {
        return;
      }

      this._total = pageContainer.total;

      for (let i = 0; i < pageContainer.list.length; i++) {
        this.items.push(pageContainer.list[i]);
      }

      this._front = this._front + this.query.count;
      if (this._total < this._front) {
        this._front = this._total;
      }

    } finally {
      this.isBusy = true;
    }
  }

  private reset() {
    this._rear = Number.MAX_VALUE;
    this._rearCount = 30;
    this._front = 0;
    this._total = Number.MIN_VALUE;
    this.query = new Query();
    this.items = [];
  }

}

export class Query {

  public from: number;
  public count: number;

  constructor(from?: number, count?: number) {
    this.from = from || 0;
    this.count = count || 30;
  }

}
