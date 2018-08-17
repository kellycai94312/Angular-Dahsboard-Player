import {Component} from '@angular/core';
import {GroupService} from '../../group.service';
import {GroupConnectionType} from '../../../../data/remote/model/group/group-connection-type';

@Component({
  selector: 'app-group-connections',
  templateUrl: './group-connections.component.html',
  styleUrls: ['./group-connections.component.scss']
})
export class GroupConnectionsComponent {

  public readonly groupConnectionType = GroupConnectionType;
  public readonly object = Object;
  public readonly groupId: number;

  constructor(private _groupService: GroupService) {
    this.groupId = _groupService.getGroup().id;
  }

}
