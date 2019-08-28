import {Component, ComponentFactoryResolver} from '@angular/core';
import {BaseGroupSettingsComponent} from '../../model/base-group-settings-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {BaseEditComponent} from '../../../../../../data/local/component/base/base-edit-component';
import {GroupPosition} from '../../../../../../data/remote/model/person-position/group-position';
import {GroupApiService} from '../../../../../../data/remote/rest-api/api/group/group-api.service';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {PositionApiService} from '../../../../../../data/remote/rest-api/api/position/position-api.service';
import {EditGroupPositionComponent} from '../../../../../../module/group/group-position/edit-group-position/edit-group-position/edit-group-position.component';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';

@Component({
  selector: 'app-positions-group-settings',
  templateUrl: './positions-group-settings.component.html',
  styleUrls: ['./positions-group-settings.component.scss']
})
export class PositionsGroupSettingsComponent extends BaseGroupSettingsComponent<Group> {

  public component: BaseEditComponent<Group>;
  public groupPositions: GroupPosition[] = [];

  constructor(private _groupApiService: GroupApiService,
              private _positionApiService: PositionApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _ngxModalService: NgxModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    this._groupApiService.getGroupPositions(group, {count: PropertyConstant.pageSizeMax}).subscribe(value => {
      this.groupPositions = value.list;
    });
  }

  public async onAdd(): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'personPosition';
    await modal.componentInstance.initializeBody(EditGroupPositionComponent, async component => {
      component.group = this.group;
      await component.initialize(new GroupPosition());
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            this.groupPositions.push(component.data);
          }
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

}
