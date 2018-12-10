import {Component} from '@angular/core';
import {GroupConnectionType} from '../../../../data/remote/model/group/group-connection-type';
import {Group} from '../../../../data/remote/model/group/base/group';
import {BaseGroupComponent} from '../../../../data/local/component/group/base-group-component';
import {GroupService} from '../../../group/group-page/service/group.service';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-group-connections',
  templateUrl: './group-connections.component.html',
  styleUrls: ['./group-connections.component.scss']
})
export class GroupConnectionsComponent extends BaseGroupComponent<Group> {

  public readonly groupConnectionTypeClass = GroupConnectionType;
  public readonly object = Object;

  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

}
