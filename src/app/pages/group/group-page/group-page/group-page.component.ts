import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { GroupPerson } from 'app/data/remote/model/group';
import { Group } from 'app/data/remote/model/group/base';
import { ToolbarService } from 'app/layout/components/toolbar/services/toolbar.service';
import { NgxTab } from 'app/module/ngx/ngx-tabs/model/ngx-tab';
import { AppHelper } from 'app/utils/app-helper';
import { takeWhile } from 'rxjs/operators';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  providers: [GroupService]
})
export class GroupPageComponent extends BaseGroupComponent<Group> implements OnInit, OnDestroy {

  public readonly tabs: NgxTab[];
  public visibleGroupMenu: boolean;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService,
              private _toolbarService: ToolbarService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);

    this.tabs = [
      {
        translation: 'news',
        link: 'news'
      },
      {
        translation: 'employees',
        link: 'employee'
      },
      // {
      //   translation: 'subgroups',
      //   link: 'subgroup',
      //   hidden$: this.canEditSubject.pipe(map(value => !value))
      // },
      {
        translation: 'subscribers',
        link: 'subscriber'
      },
      // {
      //   translation: 'requests',
      //   link: 'request',
      //   hidden$: this.canEditSubject.pipe(map(value => !value))
      // },
      // {
      //   translation: 'structure',
      //   link: 'structure'
      // },
      {
        translation: 'timetableOfClasses',
        link: 'schedule'
      }
    ];
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initializeGroupService(this._activatedRoute, this._router);

    this._toolbarService.visibleGroupMenu$
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(value => {
        this.visibleGroupMenu = value;
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this._toolbarService.updateGroup(void 0);
  }

  public async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    const canViewAdministrationTool = await this._groupService.canViewAdministrationTool();
    if (canViewAdministrationTool) {
      this._toolbarService.updateGroup(group);
    } else {
      delete this.visibleGroupMenu;
    }
  }

  public onChangeGroupPerson(groupPerson: GroupPerson): void {
    this._groupService.updateGroupPerson(groupPerson);
  }

}
