import {Component} from '@angular/core';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {NgxTabAction} from '../../../../module/ngx/ngx-tabs/model/ngx-tab-action';
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
  }

  public onSearchTextChange(value: string): void {
    this._groupsService.setSearchText(value);
  }

  public onItemDisplayChange(value: ItemDisplay): void {
    this._groupsService.setItemDisplay(value);
  }

}
