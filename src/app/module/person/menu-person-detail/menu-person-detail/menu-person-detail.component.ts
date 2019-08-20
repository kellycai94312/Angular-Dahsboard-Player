import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from '../../../common/item-line/model/menu-item';
import {PersonMenuItemType} from '../model/person-menu-item-type';

@Component({
  selector: 'app-menu-person-detail',
  templateUrl: './menu-person-detail.component.html',
  styleUrls: ['./menu-person-detail.component.scss']
})
export class MenuPersonDetailComponent<T extends MenuItem> implements OnInit {

  @Output()
  public readonly selectedItemChange = new EventEmitter<T>();

  public items: MenuItem[];
  public selectedItem: MenuItem;

  constructor() {
  }

  public ngOnInit(): void {
    const action = (item: T) => {
      this._updateSelection(item);
    };

    this.items = Object.keys(PersonMenuItemType).map(x => {
      return {
        translationLabel: `personMenuItemTypeEnum.${x}`,
        data: x,
        action
      };
    });

    this._updateSelection(this.items[0] as T);
  }

  private _updateSelection(item: T): void {
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
  }

}
