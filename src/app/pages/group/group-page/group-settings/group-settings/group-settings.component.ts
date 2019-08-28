import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss']
})
export class GroupSettingsComponent extends BaseGroupComponent<Group> implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public selectedComponent: BaseGroupSettingsComponent<Group>;
  public items: NameWrapper<string>[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initializeGroupService(this._activatedRoute, this._router);
    this.items = Object.keys(GroupSettingsItem).map(value => new NameWrapper(this._getPathByGroupSettingsItem(value as GroupSettingsItem), `groupSettingsItemEnum.${value}`));
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
