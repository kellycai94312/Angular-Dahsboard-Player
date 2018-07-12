import {Component, OnInit} from '@angular/core';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {PersonService} from '../person.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  public groupPersons: GroupPerson[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _personService: PersonService) {
  }

  async ngOnInit() {
    try {
      this.groupPersons = await  this._participantRestApiService.getGroupPersons({personId: this._personService.personViewModel.data.id});
    } catch (e) {
    }
  }

  public onEdit = () => {
    // TODO: Add modal for edit my groups
    console.log('onEdit');
  };

}
