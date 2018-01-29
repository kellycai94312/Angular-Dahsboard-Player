import {Component, Input, OnInit} from '@angular/core';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupPersonModalComponent} from '../group-person-modal/group-person-modal.component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../group.service';

// TODO: Set GroupPersonComponent base component
@Component({
  selector: 'app-group-person-new',
  templateUrl: './group-person.component.html',
  styleUrls: ['./group-person.component.scss']
})
export class GroupPersonComponent implements OnInit {

  @Input()
  public groupPerson: GroupPerson;
  public baseGroupPerson: GroupPerson;

  constructor(private _modalService: NgbModal,
              private _participantRestApiService: ParticipantRestApiService,
              public groupService: GroupService) {
  }

  async ngOnInit() {
    try {
      this.baseGroupPerson = await this._participantRestApiService.getBaseGroup({
        id: this.groupPerson.person.id,
        userRoleId: this.groupPerson.userRole.id
      });
    } catch (e) {
      this.baseGroupPerson = null;
    }
  }

  public onEdit() {
    const modalRef = this._modalService.open(GroupPersonModalComponent, {size: 'lg'});
    modalRef.componentInstance.groupPerson = this.groupPerson;
  }

}
