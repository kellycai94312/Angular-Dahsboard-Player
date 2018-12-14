import {Component, Input} from '@angular/core';
import {SplitButtonItem} from '../bean/split-button-item';

@Component({
  selector: 'ngx-split-button',
  templateUrl: './ngx-split-button.component.html',
  styleUrls: ['./ngx-split-button.component.scss']
})
export class NgxSplitButtonComponent {

  @Input('class')
  public classes: string;

  @Input()
  public placementRight: boolean;

  @Input()
  public data: any;

  public busy: boolean;

  get items(): SplitButtonItem[] {
    return this._items;
  }

  @Input()
  set items(value: SplitButtonItem[]) {
    this._items = value;
    this.updateDefaultItem();
  }

  public defaultItem: SplitButtonItem;

  private readonly _visiblePredicate: (x: SplitButtonItem) => boolean;
  private _items: SplitButtonItem[];

  constructor() {
    this.classes = '';
    this._visiblePredicate = x => {
      if (typeof x.visible === 'function') {
        if (x.visible) {
          return x.visible();
        }
        return true;
      }
      return !x.visible || x.visible;
    };
    // TODO: Call updateDefaultItem() when will changed any values within in this method
    setInterval(() => {
      this.updateDefaultItem();
    }, 1000);
  }

  public async onClick(item: SplitButtonItem) {
    this.busy = true;
    // TODO: Add busy indication
    try {
      item.data = this.data;
      await item.callback(item);
    } finally {
      this.busy = false;
    }
  }

  public canShowDropDownMenu = (): boolean => {
    return this.items.filter(this._visiblePredicate).length > 1;
  };

  private updateDefaultItem() {
    if (this._items && this._items.length) {
      let index = this._items.findIndex(x => {
        if (x.default) {
          return this._visiblePredicate(x);
        }
        return false;
      });

      if (index < 0) {
        index = this._items.findIndex(this._visiblePredicate);
      }
      if (index < 0) {
        this.defaultItem = null;
      } else {
        this.defaultItem = this._items[index];
      }
    } else {
      this.defaultItem = null;
    }
  }

}
