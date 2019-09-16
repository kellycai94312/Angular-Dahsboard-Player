import {Component, ViewChild} from '@angular/core';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {BaseGroupSettingsComponent} from '../../model/base-group-settings-component';
import {EditGroupDetailsComponent} from '../../../../../../module/group/edit/edit-group-details/edit-group-details/edit-group-details.component';
import {BaseEditComponent} from '../../../../../../data/local/component/base/base-edit-component';

@Component({
  selector: 'app-requisites-group-settings',
  templateUrl: './requisites-group-settings.component.html',
  styleUrls: ['./requisites-group-settings.component.scss']
})
export class RequisitesGroupSettingsComponent extends BaseGroupSettingsComponent<Group> {

  @ViewChild(EditGroupDetailsComponent, { static: false })
  public component: BaseEditComponent<Group>;

  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.allowSave = true;
  }

}
