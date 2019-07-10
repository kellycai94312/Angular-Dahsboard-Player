import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {MenuItem} from '../../item-line/model/menu-item';
import {ItemDisplay} from '../../item-list/model/item-display';

@Component({
  selector: 'app-list-heading',
  templateUrl: './list-heading.component.html',
  styleUrls: ['./list-heading.component.scss']
})
export class ListHeadingComponent implements OnInit, OnDestroy {

  @Input()
  public translationTitle: string;

  @Input()
  public actions: MenuItem[] = [];

  @Input()
  public canSearch = true;

  @Input()
  public canChangeItemDisplay = true;

  @Output()
  public readonly searchTextChange = new EventEmitter<string>();

  @Output()
  public readonly itemDisplayChange = new EventEmitter<ItemDisplay>();

  public readonly searchControl = new FormControl();
  public itemDisplayAction: MenuItem;
  private _notDestroyed = true;
  private _itemDisplay: ItemDisplay;

  public ngOnInit(): void {
    const viewListIconName = 'view_list';
    const viewModuleIconName = 'view_module';

    this.itemDisplayAction = {
      iconName: viewModuleIconName,
      action: (item) => {
        if (this._itemDisplay === ItemDisplay.LIST) {
          item.iconName = viewModuleIconName;
          this._itemDisplay = ItemDisplay.GRID;
        } else {
          item.iconName = viewListIconName;
          this._itemDisplay = ItemDisplay.LIST;
        }
        this.itemDisplayChange.emit(this._itemDisplay);
      }
    };

    this.searchControl.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.searchTextChange.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
