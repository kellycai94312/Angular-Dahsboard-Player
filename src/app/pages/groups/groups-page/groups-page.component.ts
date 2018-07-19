import {Component, OnInit, ViewChild} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {ActivatedRoute, Router} from '@angular/router';
import {TabComponent} from '../../../components/tab/tab.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  @ViewChild(TabComponent)
  public tabComponent: TabComponent;
  public readonly tabs: Tab[];

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authorizationService: AuthorizationService) {
    this.tabs = [];
    const allTab = new Tab();
    allTab.nameKey = 'groups.all';
    allTab.routerLink = 'all';
    this.tabs.push(allTab);

    const myTab = new Tab();
    myTab.nameKey = 'groups.my';
    myTab.routerLink = 'my';
    this.tabs.push(myTab);
  }

  async ngOnInit() {
    this.tabComponent.tabs = this.tabs;
    if (await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR)) {
      this.tabComponent.newElement = this.openNewGroupPage;
    }
  }

  public openNewGroupPage = async () => this._router.navigate(['new'], {relativeTo: this._route});

}
