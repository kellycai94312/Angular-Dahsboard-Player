import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Subject} from 'rxjs/Subject';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {PersonService} from '../person.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
  userRoles: UserRole[];
  roles: UserRole[];
  private roleSubject: Subject<any> = new Subject();

  constructor(public bsModalRef: BsModalRef,
              private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService) {
  }

  async ngOnInit() {
    // TODO: Передалеть получение объектов
    this.roles = await this._participantRestApiService.getUserRoles();
    this.roleSubject.next();
  }

  getRoles = (typing: string) => {
    const data = [];
    for (const item of this.roles) {
      if (item.userRoleEnum.toString().toLowerCase().indexOf(typing) > -1) {
        data.push(item);
      }
    }
    return data;
  };

  addRole = (typing: string, role: UserRole) => {
    this.roles.splice(this.roles.indexOf(role), 1);
    this.userRoles.push(role);
    return this.getRoles(typing);
  };

  removeRole(role: UserRole) {
    this.userRoles.splice(this.userRoles.indexOf(role), 1);
    this.roles.push(role);
    this.roleSubject.next(); // refresh data
  }

  async save() {
    const user = await this._participantRestApiService.changeRoles(new ListRequest(this.userRoles));
    this._personService.emitRolesChange(user.userRoles);
    this.bsModalRef.hide();
  }

}
