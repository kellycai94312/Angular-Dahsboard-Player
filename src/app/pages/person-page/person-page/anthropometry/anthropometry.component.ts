import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PersonAnthropometry} from '../../../../data/remote/model/person-anthropometry';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {PersonService} from '../../../person/person-page/service/person.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {SportType} from '../../../../data/remote/model/sport-type';
import {AppHelper} from '../../../../utils/app-helper';

// @Component({
//   selector: 'app-anthropometry',
//   templateUrl: './anthropometry.component.html',
//   styleUrls: ['./anthropometry.component.scss']
// })
export class AnthropometryComponent implements OnInit, OnDestroy {

  public anthropometry: PersonAnthropometry[];
  public canEdit: boolean;

  private readonly _sportTypeSubscription: ISubscription;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    // this._sportTypeSubscription = this._personService.sportTypeSubject.subscribe(async sportType => await this.initialize(sportType));
  }

  async ngOnInit() {
    // this.canEdit = await this._personService.allowEdit();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async initialize(sportType: SportType): Promise<void> {
    // if (sportType) {
    //   this.anthropometry = await this._participantRestApiService.getAnthropometry({
    //     id: this._personService.personViewModel.data.id,
    //     sportTypeId: sportType.id
    //   });
    // } else {
    //   this.anthropometry = [];
    // }
  }

  public onSave = async () => {
    // await this._appHelper.trySave(async () => {
    //   const sportType = this._personService.sportTypeSubject.getValue();
    //   if (sportType) {
    //     this.anthropometry = await this._participantRestApiService.updateAnthropometry(new ListRequest(this.anthropometry), {}, {
    //       personId: this._personService.personViewModel.data.id,
    //       sportTypeId: sportType.id
    //     });
    //   }
    // });
  };

}
