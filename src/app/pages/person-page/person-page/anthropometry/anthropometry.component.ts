import { Component, OnInit } from '@angular/core';
import { PersonAnthropometry } from '../../../../data/remote/model/person-anthropometry';
import { ListRequest } from '../../../../data/remote/request/list-request';
import { AnthropometryRequest } from '../../../../data/remote/request/anthropometry-request';
import { PersonService } from '../person.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { SportType } from '../../../../data/remote/model/sport-type';
import { SportTypeEnum } from '../../../../data/remote/misc/sport-type-enum';

@Component({
  selector: 'app-anthropometry',
  templateUrl: './anthropometry.component.html',
  styleUrls: ['./anthropometry.component.scss']
})
export class AnthropometryComponent implements OnInit {

  anthropometry: PersonAnthropometry[];
  isEditAllow: boolean;
  private _sportTypeEnum: SportTypeEnum;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    if (_personService.sportTypeSelectDefault) {
      this._sportTypeEnum = _personService.sportTypeSelectDefault.sportTypeEnum;
      this.load(_personService.sportTypeSelectDefault);
    }
    _personService.sportTypeSelectEmitted$.subscribe(sportType => this.load(sportType));
  }

  ngOnInit() {
  }

  async save() {
    if (this._sportTypeEnum) {
      const request: AnthropometryRequest = new AnthropometryRequest();
      request.anthropometry = new ListRequest(this.anthropometry);
      request.sportType = this._sportTypeEnum;
      this.anthropometry = await this._participantRestApiService.changeAnthropometry(request);
    }
  }

  private async load(sportType: SportType) {
    this._personService.sportTypeSelectDefault = sportType;
    if (sportType == null) {
      this._sportTypeEnum = null;
      this.anthropometry = [];
    } else {
      this._sportTypeEnum = sportType.sportTypeEnum;
      this.anthropometry = await this._participantRestApiService.getAnthropometry({
        id: this._personService.shared.person.id,
        sportType: this._sportTypeEnum
      });
    }
  }

}
