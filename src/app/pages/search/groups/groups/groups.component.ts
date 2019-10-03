import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../../../data/remote/model/group/base';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { MenuItem } from '../../../../module/common/item-line/model/menu-item';
import { ItemDisplay } from '../../../../module/common/item-list/model/item-display';
import { GroupsListComponent } from '../../../../module/group/groups-list/groups-list/groups-list.component';
import { TemplateModalService } from '../../../../service/template-modal.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @ViewChild(GroupsListComponent, { static: false })
  public _groupsListComponent: GroupsListComponent;

  public readonly groupQuery: GroupQuery;
  public itemDisplay: ItemDisplay;
  public actions: MenuItem[];

  constructor(private _templateModalService: TemplateModalService) {
    this.groupQuery = {
      name: ''
    };
  }

  public ngOnInit(): void {
    this.actions = [
      {
        iconName: 'add',
        action: async () => {
          await this._templateModalService.showEditGroupModal(new Group());
        }
      }
    ];
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
