import {Component} from '@angular/core';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {PersonsService} from '../service/persons/persons.service';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss'],
  providers: [PersonsService]
})
export class PersonsPageComponent {

  public readonly tabs: NgxTab[];
  public readonly translationTitle = 'persons.section';

  constructor(private _personsService: PersonsService) {
    this.tabs = [
      {translation: 'myContacts', link: 'my'},
      {translation: 'all', link: 'all'}
    ];
  }

  public onSearchTextChange(value: string): void {
    this._personsService.setSearchText(value);
  }

  public onItemDisplayChange(value: ItemDisplay): void {
    this._personsService.setItemDisplay(value);
  }

}
