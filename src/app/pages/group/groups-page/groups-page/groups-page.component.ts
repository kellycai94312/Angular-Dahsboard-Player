import {Component} from '@angular/core';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PermissionService} from '../../../../shared/permission.service';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {NgxTabAction} from '../../../../module/ngx/ngx-tabs/model/ngx-tab-action';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent {

  public readonly tabs: NgxTab[];

  constructor(private _authorizationService: AuthorizationService,
              private _permissionService: PermissionService,
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

}
