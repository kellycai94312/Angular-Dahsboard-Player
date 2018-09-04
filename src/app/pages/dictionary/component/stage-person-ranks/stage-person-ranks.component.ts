import {Component, Input} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {SportType} from '../../../../data/remote/model/sport-type';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-stage-person-ranks',
  templateUrl: './stage-person-ranks.component.html',
  styleUrls: ['./stage-person-ranks.component.scss']
})
export class StagePersonRanksComponent {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public stageType: StageType;

  @Input()
  public sportType: SportType;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  public fetchItems = async (query: PageQuery) => {
    return this._appHelper.arrayToPageContainer(await this._participantRestApiService.getStagePersonRanks({}, {stageTypeId: this.stageType.id}, {sportTypeId: this.sportType.id}));
  };

  public getAge(birthDate: string): number {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  }

}
