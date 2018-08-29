import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-edit-stage',
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.scss']
})
export class EditStageComponent extends BaseEditComponent<Stage> {

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data = await this.participantRestApiService.updateStageShortName({name: this.data.shortName}, {}, {stageId: this.data.id});
    });
  }

}
