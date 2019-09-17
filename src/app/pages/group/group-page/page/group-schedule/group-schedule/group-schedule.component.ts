import { Component } from '@angular/core';
import { BaseGroupComponent } from '../../../../../../data/local/component/group/base-group-component';
import { Group } from '../../../../../../data/remote/model/group/base/group';
import { AppHelper } from '../../../../../../utils/app-helper';
import { GroupService } from '../../../service/group.service';

@Component({
  templateUrl: './group-schedule.component.html',
  styleUrls: ['./group-schedule.component.scss']
})
export class GroupScheduleComponent extends BaseGroupComponent<Group> {
  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }
}
