import {Component} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {GroupPersonPosition} from '../../../../data/remote/model/group/position/group-person-position';

@Component({
  selector: 'app-group-person-position-item',
  templateUrl: './group-person-position-item.component.html',
  styleUrls: ['./group-person-position-item.component.scss']
})
export class GroupPersonPositionItemComponent extends BaseComponent<GroupPersonPosition> {
}
