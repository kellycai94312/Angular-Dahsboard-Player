import {Component} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {AppHelper} from '../../../../utils/app-helper';
import {StageType} from '../../../../data/remote/model/stage/stage-type';

@Component({
  selector: 'app-edit-stage-type',
  templateUrl: './edit-stage-type.component.html',
  styleUrls: ['./edit-stage-type.component.scss']
})
export class EditStageTypeComponent extends BaseEditComponent<StageType> {

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      // TODO: Set save short name
      this.data = null;
    });
  }

}
