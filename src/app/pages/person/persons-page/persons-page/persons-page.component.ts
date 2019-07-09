import {Component} from '@angular/core';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {PersonsService} from '../service/persons/persons.service';
import {MenuItem} from '../../../../module/common/item-line/model/menu-item';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss'],
  providers: [PersonsService]
})
export class PersonsPageComponent {

  public readonly tabs: NgxTab[];
  public readonly translationTitle = 'persons';
  public readonly actions: MenuItem[] = [];
  public itemDisplay = ItemDisplay.GRID;

  constructor(private _personsService: PersonsService) {
    this.tabs = [
      {translation: 'myContacts', link: 'my'},
      {translation: 'all', link: 'all'}
    ];

    const viewListIconName = 'view_list';
    const viewModuleIconName = 'view_module';
    this.actions = [{
      iconName: viewListIconName,
      action: (item) => {
        if (this.itemDisplay === ItemDisplay.LIST) {
          item.iconName = viewModuleIconName;
          this.itemDisplay = ItemDisplay.GRID;
        } else {
          item.iconName = viewListIconName;
          this.itemDisplay = ItemDisplay.LIST;
        }
        this._personsService.setItemDisplay(this.itemDisplay);
      }
    }];
  }

  public onSearchTextChange(value: string): void {
    this._personsService.setSearchText(value);
  }

}
