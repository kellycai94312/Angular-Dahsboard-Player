import { Component, OnInit } from '@angular/core';
import { PersonAnthropometry } from '../../../../data/remote/model/person-anthropometry';
import { ListRequest } from '../../../../data/remote/request/list-request';
import { PersonService } from '../person.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { SportType } from '../../../../data/remote/model/sport-type';

@Component({
  selector: 'app-anthropometry',
  templateUrl: './anthropometry.component.html',
  styleUrls: ['./anthropometry.component.scss']
})
export class AnthropometryComponent implements OnInit {

  anthropometry: PersonAnthropometry[];
  isEditAllow: boolean;
  private _sportTypeId: number;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    if (_personService.sportTypeSelectDefault) {
      this._sportTypeId = _personService.sportTypeSelectDefault.id;
      this.load(_personService.sportTypeSelectDefault);
    }
    _personService.sportTypeSelectEmitted$.subscribe(sportType => this.load(sportType));
  }

  ngOnInit() {
  }

  async save() {
    if (this._sportTypeId) {
      const listRequest: ListRequest<PersonAnthropometry> = new ListRequest(this.anthropometry);
      this.anthropometry = await this._participantRestApiService.updateAnthropometry(listRequest, {}, {sportTypeId: this._sportTypeId});
    }
  }

  private async load(sportType: SportType) {
    this._personService.sportTypeSelectDefault = sportType;
    if (sportType == null) {
      this._sportTypeId = null;
      this.anthropometry = [];
    } else {
      this._sportTypeId = sportType.id;
      this.anthropometry = await this._participantRestApiService.getAnthropometry({
        id: this._personService.shared.person.id,
        sportTypeId: this._sportTypeId
      });
    }
  }

}
