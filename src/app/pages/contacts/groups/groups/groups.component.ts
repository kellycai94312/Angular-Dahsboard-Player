import {Component, ViewChild} from '@angular/core';
import {GroupsListComponent} from '../../../../module/group/groups-list/groups-list/groups-list.component';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {

  @ViewChild(GroupsListComponent)
  public _groupsListComponent: GroupsListComponent;

  public readonly groupQuery: GroupQuery;
  public itemDisplay: ItemDisplay;

  constructor() {
    this.groupQuery = {
      name: '',
      all: false
    };
  }

  public async onSearchTextChange(value: string): Promise<void> {
    this.groupQuery.name = value;
    await this._groupsListComponent.updateItems();
  }

  public async onItemDisplayChange(value: ItemDisplay): Promise<void> {
    this.itemDisplay = value;
    await this._groupsListComponent.updateItems();
  }

}
