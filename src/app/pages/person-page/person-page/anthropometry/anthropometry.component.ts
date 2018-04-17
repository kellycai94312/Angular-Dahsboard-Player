import {Component, OnInit} from '@angular/core';
import {PersonAnthropometry} from '../../../../data/remote/model/person-anthropometry';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {PersonService} from '../person.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {SportType} from '../../../../data/remote/model/sport-type';

@Component({
  selector: 'app-anthropometry',
  templateUrl: './anthropometry.component.html',
  styleUrls: ['./anthropometry.component.scss']
})
export class AnthropometryComponent implements OnInit {

  public anthropometry: PersonAnthropometry[];
  public isEditAllow: boolean;

  private _sportTypeId: number;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    _personService.sportTypeSelectEmitted$.subscribe(sportType => this.load(sportType));
  }

  async ngOnInit() {
    if (this._personService.sportTypeSelectDefault) {
      this._sportTypeId = this._personService.sportTypeSelectDefault.id;
      await this.load(this._personService.sportTypeSelectDefault);
    }
  }

  public async onSave() {
    if (this._sportTypeId) {
      this.anthropometry = await this._participantRestApiService.updateAnthropometry(new ListRequest(this.anthropometry), {}, {sportTypeId: this._sportTypeId});
    }
  }

  private async load(sportType: SportType) {
    this._personService.sportTypeSelectDefault = sportType;
    if (!sportType) {
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
