import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {MenuItem} from '../../item-line/model/menu-item';
import {ItemDisplay} from '../../item-list/model/item-display';
import {ListHeadingService} from '../services/list-heading.service';

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
  public rightActions: MenuItem[] = [];

  @Input()
  public canSearch = true;

  @Input()
  public canChangeItemDisplay = true;

  @Input()
  public itemDisplay: ItemDisplay;

  @Output()
  public readonly searchTextChange = new EventEmitter<string>();

  @Output()
  public readonly itemDisplayChange = new EventEmitter<ItemDisplay>();

  public readonly searchControl = new FormControl();
  public itemDisplayAction: MenuItem;
  private _notDestroyed = true;

  constructor(private _listHeadingService: ListHeadingService) {
  }

  public ngOnInit(): void {
    const viewListIconName = 'view_list';
    const viewModuleIconName = 'view_module';

    this.itemDisplayAction = {
      iconName: this.itemDisplay === ItemDisplay.LIST ? viewListIconName : viewModuleIconName,
      action: (item) => {
        if (this.itemDisplay === ItemDisplay.LIST) {
          item.iconName = viewModuleIconName;
          this.itemDisplay = ItemDisplay.GRID;
        } else {
          item.iconName = viewListIconName;
          this.itemDisplay = ItemDisplay.LIST;
        }
        this.itemDisplayChange.emit(this.itemDisplay);
        this._listHeadingService.updateItemDisplay(this.itemDisplay);
      }
    };

    this.searchControl.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.searchTextChange.emit(value);
        this._listHeadingService.updateSearch(value);
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
