import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserRole } from '../../../../data/remote/model/user-role';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { Subject } from 'rxjs/Subject';
import { ListRequest } from '../../../../data/remote/request/list-request';
import { PersonService } from '../person.service';
import { TranslateService } from '@ngx-translate/core';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
  userRoles: UserRole[];
  roles: UserRole[];
  private errorMessage: string;
  private roleSubject: Subject<any> = new Subject();

  constructor(public bsModalRef: BsModalRef,
              private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _translate: TranslateService) {
  }

  async ngOnInit() {
    this.roles = (await this._participantRestApiService.getUserRoles())
      .filter(role =>
        this.userRoles
          .filter(uRole => uRole.id === role.id).length === 0);
    this.roleSubject.next();
    this.errorMessage = await this._translate.get('persons.person.roles.conflict').toPromise();
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
    try {
      const userRoles = await this._participantRestApiService.changeRoles(new ListRequest(this.userRoles));
      this._personService.emitRolesChange(userRoles);
      this.bsModalRef.hide();
    } catch (e) {
      if (e.status === 409) {
        notify(this.errorMessage, 'warning', 3000);
      } else {
        throw e;
      }
    }
  }

}
