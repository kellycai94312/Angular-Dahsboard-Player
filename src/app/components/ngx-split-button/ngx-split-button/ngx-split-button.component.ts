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

  public busy: boolean;

  get items(): SplitButtonItem[] {
    return this._items;
  }

  @Input()
  set items(value: SplitButtonItem[]) {
    this._items = value;

    // TODO: Add sort by order
    if (this._items && this._items.length) {
      let index = this._items.findIndex(x => x.default);
      if (index < 0) {
        index = 0;
      }
      this.defaultItem = this._items[index];

      this.additionalItems = <SplitButtonItem[]>JSON.parse(JSON.stringify(this._items));
      this.additionalItems.splice(this.additionalItems.indexOf(this.defaultItem), 1);
    } else {
      this.defaultItem = null;
      this.additionalItems = [];
    }
  }

  public defaultItem: SplitButtonItem;

  private _items: SplitButtonItem[];

  public additionalItems: SplitButtonItem[];

  constructor() {
    this.classes = '';
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

}
