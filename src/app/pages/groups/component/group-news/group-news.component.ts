import {Component, OnInit} from '@angular/core';
import {BaseGroupComponent} from '../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupService} from '../../group.service';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-group-news',
  templateUrl: './group-news.component.html',
  styleUrls: ['./group-news.component.scss']
})
export class GroupNewsComponent extends BaseGroupComponent<Group> implements OnInit {

  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  ngOnInit() {
  }

}
