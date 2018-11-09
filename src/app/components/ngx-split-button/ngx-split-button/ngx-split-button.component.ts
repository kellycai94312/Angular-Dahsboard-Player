import {Component, Input} from '@angular/core';
import {SplitButtonItem} from '../bean/split-button-item';
import {AppHelper} from '../../../utils/app-helper';

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
    if (this._items && this._items.length) {
      let index = this._items.findIndex(x => x.default);
      if (index < 0) {
        index = 0;
      }
      this.defaultItem = this._items[index];
    } else {
      this.defaultItem = null;
    }
  }

  public defaultItem: SplitButtonItem;

  private _items: SplitButtonItem[];

  constructor(private _appHelper: AppHelper) {
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

  public canShowDropDownMenu = (): boolean => {
    return this.items.filter(x => this._appHelper.isUndefinedOrNull(x.visible) || x.visible()).length > 1;
  };

}
