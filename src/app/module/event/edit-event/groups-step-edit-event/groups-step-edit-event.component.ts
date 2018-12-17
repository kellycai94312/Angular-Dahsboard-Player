import {Component, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Group} from '../../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-groups-step-edit-event',
  templateUrl: './groups-step-edit-event.component.html',
  styleUrls: ['./groups-step-edit-event.component.scss']
})
export class GroupsStepEditEventComponent<T extends BaseTraining> extends BaseEditComponent<T> implements OnInit {

  public groups: Group[];

  private _afterCreateEvent: boolean;
  private _conversation: BaseConversation;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
    this.groups = [];
  }

  public preInitialize(afterCreateEvent: boolean, conversation: BaseConversation) {
    this._afterCreateEvent = afterCreateEvent;
    this._conversation = conversation;
  }

  async initialize(obj: T): Promise<boolean> {
    await super.initialize(obj);

    if (this._afterCreateEvent && this._conversation) {
      this.groups = (await this.participantRestApiService.getTrainingGroupsByBaseTraining({}, {
        count: PropertyConstant.pageSizeMax,
        conversationId: this._conversation.id,
        unassigned: true
      }, {eventId: this.data.id})).list.map(x => x.group);
    } else {
      this.groups = (await this.participantRestApiService.getTrainingGroupsByBaseTraining(
          {},
          {
            count: PropertyConstant.pageSizeMax,
            unassigned: false
          },
          {eventId: obj.id}
        )
      ).list.map(x => x.group);
    }

    return true;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeEvent({eventId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      await this.participantRestApiService.updateGroupsByBaseTraining({list: this.groups}, {}, {baseTrainingId: this.data.id});
    });
  }

  public onEditGroups = async () => {
    await this._ngxModalService.showSelectionGroupsModal(this.groups, async selectedItems => {
      this.appHelper.updateArray(this.groups, selectedItems);
    });
  };

}
