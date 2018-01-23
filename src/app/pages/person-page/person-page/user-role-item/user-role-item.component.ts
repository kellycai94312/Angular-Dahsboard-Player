import { Component, Input, OnInit } from '@angular/core';
import { UserRole } from '../../../../data/remote/model/user-role';

@Component({
  selector: 'app-user-role-item',
  templateUrl: './user-role-item.component.html',
  styleUrls: ['./user-role-item.component.scss']
})
export class UserRoleItemComponent implements OnInit {

  @Input()
  public data: UserRole;

  constructor() {
  }

  ngOnInit() {
  }

}
