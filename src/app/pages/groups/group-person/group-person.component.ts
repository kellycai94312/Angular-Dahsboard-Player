import { Component, Input, OnInit } from '@angular/core';
import { GroupPerson } from '../../../data/remote/model/group/group-person';

@Component({
  selector: 'app-group-person',
  templateUrl: './group-person.component.html',
  styleUrls: ['./group-person.component.scss']
})
export class GroupPersonComponent implements OnInit {

  @Input()
  public groupPerson: GroupPerson;

  constructor() {
  }

  ngOnInit() {
  }

}
