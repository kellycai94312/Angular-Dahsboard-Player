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
  }

  public async onClick(item: SplitButtonItem) {
    this.busy = true;
    // TODO: Add busy indication
    try {
      await item.callback();
    } finally {
      this.busy = false;
    }
  }

  public canShowDropDownMenu = (): boolean => {
    // TODO: Call updateDefaultItem() when will changed any values within in this method
    this.updateDefaultItem();
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
