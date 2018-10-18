import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {AuthorizationService} from '../../../shared/authorization.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupComponent} from '../component/edit-group/edit-group.component';
import {Group} from '../../../data/remote/model/group/base/group';
import {SplitButtonItem} from '../../../components/ngx-split-button/bean/split-button-item';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  public readonly tabs: Tab[];
  private readonly _actions: SplitButtonItem[];

  constructor(private _authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    this._actions = [];
    this.tabs = [
      {
        nameKey: 'all',
        routerLink: 'all',
        splitButtonsItems: this._actions
      },
      {
        nameKey: 'my',
        routerLink: 'my',
        splitButtonsItems: this._actions
      }
    ];
  }

  async ngOnInit() {
    if (await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR)) {
      this._actions.push({
        nameKey: 'add',
        callback: async () => {
          const modal = this._ngxModalService.open();
          modal.componentInstance.titleKey = 'add';

          await modal.componentInstance.initializeBody(EditGroupComponent, async component => {
            await component.initialize(new Group());

            modal.componentInstance.splitButtonItems = [{
              nameKey: 'save',
              callback: async () => {
                if (await this._ngxModalService.save(modal, component)) {
                  await component.navigateToPage();
                }
              }
            }];
          });
        }
      });
    }
  }

}
