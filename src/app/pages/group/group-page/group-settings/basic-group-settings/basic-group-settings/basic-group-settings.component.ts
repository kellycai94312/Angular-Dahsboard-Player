import {Component, ViewChild} from '@angular/core';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {BaseGroupSettingsComponent} from '../../model/base-group-settings-component';
import {EditGroupComponent} from '../../../../../../module/group/edit-group/edit-group/edit-group.component';
import {BaseEditComponent} from '../../../../../../data/local/component/base/base-edit-component';

@Component({
  selector: 'app-basic-group-settings',
  templateUrl: './basic-group-settings.component.html',
  styleUrls: ['./basic-group-settings.component.scss']
})
export class BasicGroupSettingsComponent extends BaseGroupSettingsComponent<Group> {

  @ViewChild(EditGroupComponent)
  public component: BaseEditComponent<Group>;

  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

}
