import {Component, ViewChild} from '@angular/core';
import {PersonsListComponent} from '../../../../module/person/persons-list/persons-list/persons-list.component';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {

  @ViewChild(PersonsListComponent, { static: false })
  public _personsListComponent: PersonsListComponent;

  public readonly personQuery: PersonQuery;
  public itemDisplay: ItemDisplay;

  constructor() {
    this.personQuery = {
      name: ''
    };
  }

  public async onSearchTextChange(value: string): Promise<void> {
    this.personQuery.name = value;
    await this._personsListComponent.updateItems();
  }

  public async onItemDisplayChange(value: ItemDisplay): Promise<void> {
    this.itemDisplay = value;
    await this._personsListComponent.updateItems();
  }

}
