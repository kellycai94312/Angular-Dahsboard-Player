import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { NameWrapper } from 'app/data/local/name-wrapper';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import { Group } from 'app/data/remote/model/group/base';
import { ToolbarService } from 'app/layout/components/toolbar/services/toolbar.service';
import { AppHelper } from 'app/utils/app-helper';
import { takeWhile } from 'rxjs/operators';
import { GroupService } from '../../service/group.service';
import { BaseGroupSettingsComponent } from '../model/base-group-settings-component';
import { GroupSettingsItem } from '../model/group-settings-item';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss'],
  providers: [GroupService]
})
export class GroupSettingsComponent extends BaseGroupComponent<Group> implements OnInit, OnDestroy {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public selectedComponent: BaseGroupSettingsComponent<Group>;
  public items: NameWrapper<string>[];
  public visibleGroupMenu: boolean;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _toolbarService: ToolbarService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initializeGroupService(this._activatedRoute, this._router);
    this.items = Object.keys(GroupSettingsItem).filter(x => x !== GroupSettingsItem.ADDRESS && x !== GroupSettingsItem.INVITES && x !== GroupSettingsItem.POSITIONS && x !== GroupSettingsItem.VACANCIES).map(value => new NameWrapper(this._getPathByGroupSettingsItem(value as GroupSettingsItem), `groupSettingsItemEnum.${value}`));

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
    const canViewAdministrationTool = await this.groupService.canViewAdministrationTool();
    if (canViewAdministrationTool) {
      this._toolbarService.updateGroup(group);
    } else {
      delete this.visibleGroupMenu;
    }
  }

  public onRouterOutletActivate(value: any): void {
    this.selectedComponent = value;
  }

  public onRouterOutletDeactivate(value: any): void {
    delete this.selectedComponent;
  }

  public async onSave(): Promise<void> {
    await this.selectedComponent.onSave();
  }

  private _getPathByGroupSettingsItem(value: GroupSettingsItem): string {
    switch (value) {
      case GroupSettingsItem.REQUISITES:
        return 'requisite';
      case GroupSettingsItem.INVITES:
        return 'invite';
      case GroupSettingsItem.POSITIONS:
        return 'position';
      case GroupSettingsItem.VACANCIES:
        return 'vacancy';
      default:
        return value.toLocaleLowerCase();
    }
  }

}
