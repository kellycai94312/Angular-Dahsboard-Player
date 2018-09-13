import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {BaseExercise} from '../../../../data/remote/model/exercise/base/base-exercise';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss']
})
export class EditActivityComponent extends BaseEditComponent<BaseExercise> {

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createActivity(this.data);
      } else {
        this.data = await this.participantRestApiService.updateActivity(this.data, {}, {activityId: this.data.id});
      }
    });
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

}
