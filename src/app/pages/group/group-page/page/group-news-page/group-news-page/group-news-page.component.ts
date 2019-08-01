import {Component} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';

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
