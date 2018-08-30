import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-edit-rank',
  templateUrl: './edit-rank.component.html',
  styleUrls: ['./edit-rank.component.scss']
})
export class EditRankComponent extends BaseEditComponent<PersonRank> {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public personId: number;

  @Input()
  public rankId: number;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removeRank({personId: this.personId, rankId: this.data.rank.id});
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.date = this.appHelper.dateByFormat(this.data.date, PropertyConstant.dateTimeServerFormat);
      this.data = await this.participantRestApiService.updateRank(this.data, {}, {personId: this.personId, rankId: this.rankId});
    });
  }

}
