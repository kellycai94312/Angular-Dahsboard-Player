import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PersonAnthropometry} from '../../../../data/remote/model/person-anthropometry';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {PersonService} from '../person.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {SportType} from '../../../../data/remote/model/sport-type';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-anthropometry',
  templateUrl: './anthropometry.component.html',
  styleUrls: ['./anthropometry.component.scss']
})
export class AnthropometryComponent implements OnInit, OnDestroy {

  public anthropometry: PersonAnthropometry[];
  public allowEdit: boolean;

  private readonly _sportTypeSubscription: ISubscription;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this._sportTypeSubscription = this._personService.sportTypeHandler.subscribe(sportType => this.load(sportType));
  }

  async ngOnInit() {
    this.allowEdit = await this._personService.allowEdit();

    if (this._personService.selectedSportType) {
      await this.load(this._personService.selectedSportType);
    }
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async onSave() {
    if (this._personService.selectedSportType) {
      this.anthropometry = await this._participantRestApiService.updateAnthropometry(new ListRequest(this.anthropometry), {}, {
        personId: this._personService.personViewModel.data.id,
        sportTypeId: this._personService.selectedSportType.id
      });
    }
  }

  private async load(sportType: SportType) {
    if (sportType) {
      this.anthropometry = await this._participantRestApiService.getAnthropometry({
        id: this._personService.personViewModel.data.id,
        sportTypeId: sportType.id
      });
    } else {
      this.anthropometry = [];
    }
  }

}
