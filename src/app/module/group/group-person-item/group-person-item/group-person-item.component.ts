import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';

@Component({
  selector: 'app-group-person-item',
  templateUrl: './group-person-item.component.html',
  styleUrls: ['./group-person-item.component.scss']
})
export class GroupPersonItemComponent extends BaseComponent<GroupPerson> implements OnInit {
}
