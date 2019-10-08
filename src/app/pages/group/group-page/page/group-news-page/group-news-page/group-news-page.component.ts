import { Component } from '@angular/core';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { Group } from 'app/data/remote/model/group/base';
import { AppHelper } from 'app/utils/app-helper';
import { GroupService } from '../../../service/group.service';

@Component({
  selector: 'app-group-news-page',
  templateUrl: './group-news-page.component.html',
  styleUrls: ['./group-news-page.component.scss']
})
export class GroupNewsPageComponent extends BaseGroupComponent<Group> {
  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }
}
