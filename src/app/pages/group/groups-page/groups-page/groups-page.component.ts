import {Component} from '@angular/core';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {NgxTabAction} from '../../../../module/ngx/ngx-tabs/model/ngx-tab-action';
import {MenuItem} from '../../../../module/common/item-line/model/menu-item';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';
import {GroupsService} from '../service/groups/groups.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
  providers: [GroupsService]
})
export class GroupsPageComponent {

  public readonly tabs: NgxTab[];
  public readonly translationTitle = 'groups';
  public readonly actions: MenuItem[] = [];
  public itemDisplay = ItemDisplay.GRID;

  constructor(private _groupsService: GroupsService,
              private _templateModalService: TemplateModalService) {
    const actions: NgxTabAction[] = [{
      iconName: 'add',
      action: async () => {
        await this._templateModalService.showEditGroupModal(new Group());
      }
    }];
    this.tabs = [
      {
        translation: 'my',
        link: 'my',
        actions: actions
      },
      {
        translation: 'all',
        link: 'all',
        actions: actions
      }
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
        this._groupsService.setItemDisplay(this.itemDisplay);
      }
    }];
  }

  public onSearchTextChange(value: string): void {
    this._groupsService.setSearchText(value);
  }

}
