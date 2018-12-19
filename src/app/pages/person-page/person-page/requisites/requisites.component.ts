import {Component, OnInit} from '@angular/core';
import {Requisites} from '../../../../data/remote/model/requisites';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonService} from '../../../person/person-page/service/person.service';
import {AppHelper} from '../../../../utils/app-helper';

// @Component({
//   selector: 'app-requisites',
//   templateUrl: './requisites.component.html',
//   styleUrls: ['./requisites.component.scss']
// })
export class RequisitesComponent implements OnInit {

  public requisites: Requisites;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _appHelper: AppHelper) {
  }

  async ngOnInit() {
    this.requisites = await this._participantRestApiService.getPersonRequisites({personId: this._personService.personViewModel.data.id});
  }

  public onSave = async () => {
    try {
      this.requisites = await this._participantRestApiService.updatePersonRequisites(this.requisites, {}, {personId: this._personService.personViewModel.data.id});
      await this._appHelper.showSuccessMessage('saved');
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
  };

}
