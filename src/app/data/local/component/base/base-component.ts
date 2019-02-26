import {Input, OnInit} from '@angular/core';

export abstract class BaseComponent<T> implements OnInit {

  get data(): T {
    return this._data;
  }

  @Input()
  set data(val: T) {
    this._data = val;
    this.onSetData(val);
  }

  @Input()
  public class: string;

  private _data: T;

  private _manualInit: boolean;

  constructor() {
    this.class = '';
  }

  async ngOnInit(): Promise<void> {
    if (!this._manualInit) {
      await this.initializeComponent(this.data);
    }
  }

  public update(data: T): void {
    this.data = Object.assign(this.data, data);
  }

  public async initialize(data: T): Promise<boolean> {
    this._manualInit = true;
    return await this.initializeComponent(data);
  }

  protected async initializeComponent(data: T): Promise<boolean> {
    this._data = data;
    return true;
  }

  protected onSetData(val: T): void {
  }

}
