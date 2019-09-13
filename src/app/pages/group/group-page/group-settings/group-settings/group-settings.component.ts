import {Component, OnDestroy, OnInit} from '@angular/core';
import {NameWrapper} from '../../../../../data/local/name-wrapper';
import {GroupSettingsItem} from '../model/group-settings-item';
import {BaseGroupComponent} from '../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../service/group.service';
import {AppHelper} from '../../../../../utils/app-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageType} from '../../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../../data/remote/model/file/base/file-class';
import {BaseGroupSettingsComponent} from '../model/base-group-settings-component';
import {ToolbarService} from '../../../../../layout/components/toolbar/services/toolbar.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss']
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
    this.items = Object.keys(GroupSettingsItem).filter(x => x !== GroupSettingsItem.ADDRESS && x !== GroupSettingsItem.INVITES).map(value => new NameWrapper(this._getPathByGroupSettingsItem(value as GroupSettingsItem), `groupSettingsItemEnum.${value}`));

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
    this._toolbarService.updateGroup(group);
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

  private _getPathByGroupSettingsItem(value: GroupSettingsItem) {
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
