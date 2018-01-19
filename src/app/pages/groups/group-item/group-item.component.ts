import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {

  @Input()
  public group: Group;

  public imageUrl: string;

  constructor() {
  }

  ngOnInit() {

  }

}
