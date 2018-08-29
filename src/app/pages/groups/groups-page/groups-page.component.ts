import {Component, OnInit, ViewChild} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {AuthorizationService} from '../../../shared/authorization.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {TabComponent} from '../../../components/tab/tab.component';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupComponent} from '../component/edit-group/edit-group.component';
import {Group} from '../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  @ViewChild(TabComponent)
  public tabComponent: TabComponent;

  public readonly tabs: Tab[];

  constructor(private _authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    this.tabs = [
      {
        nameKey: 'groups.all',
        routerLink: 'all'
      },
      {
        nameKey: 'groups.my',
        routerLink: 'my'
      }
    ];
  }

  async ngOnInit() {
    if (await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR)) {
      this.tabComponent.newElement = this.addGroup;
    }
  }

  public addGroup = async () => {
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
  };

}
