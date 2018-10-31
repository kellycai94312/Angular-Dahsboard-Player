import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {AuthorizationService} from '../../../shared/authorization.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {SplitButtonItem} from '../../../components/ngx-split-button/bean/split-button-item';
import {TemplateModalService} from '../../../service/template-modal.service';
import {Group} from '../../../data/remote/model/group/base/group';
import {PermissionService} from '../../../shared/permission.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  public readonly tabs: Tab[];
  private readonly _actions: SplitButtonItem[];

  constructor(private _authorizationService: AuthorizationService,
              private _permissionService: PermissionService,
              private _templateModalService: TemplateModalService) {
    this._actions = [];
    this.tabs = [
      {
        nameKey: 'my',
        routerLink: 'my',
        splitButtonsItems: this._actions
      },
      {
        nameKey: 'all',
        routerLink: 'all',
        splitButtonsItems: this._actions
      }
    ];
  }

  async ngOnInit() {
    if (await this._permissionService.hasAnyRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR])) {
      this._actions.push({
        nameKey: 'add',
        callback: async () => {
          await this._templateModalService.showEditGroupModal(new Group());
        }
      });
    }
  }

}
