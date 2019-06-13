import {EventEmitter, Input, OnInit, Output} from '@angular/core';

export abstract class BaseComponent<T> implements OnInit {

  get data(): T {
    return this._data;
  }

  @Input()
  set data(val: T) {
    this._data = val;
    this.dataChange.emit(val);
    this.onSetData(val);
  }

  @Input()
  public class: string;

  @Output()
  public readonly dataChange = new EventEmitter();

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
    this._data = Object.assign(this._data, data);
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
