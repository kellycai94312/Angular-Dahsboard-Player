import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TrainingPerson} from '../../../../data/remote/model/training/training-person';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {TrainingPersonQuery} from '../../../../data/remote/rest-api/query/training-person-query';
import {Group} from '../../../../data/remote/model/group/base/group';
import {TemplateModalService} from '../../../../service/template-modal.service';

@Component({
  selector: 'app-persons-step-edit-event',
  templateUrl: './persons-step-edit-event.component.html',
  styleUrls: ['./persons-step-edit-event.component.scss']
})
export class PersonsStepEditEventComponent<T extends BaseTraining> extends BaseEditComponent<T> implements OnInit {

  public groups: Group[];
  public athletePersons: TrainingPerson[];
  public trainerPersons: TrainingPerson[];

  private _userRoles: UserRole[];
  private _afterCreateEvent: boolean;
  private _conversation: BaseConversation;
  private _athletePersons: TrainingPerson[];
  private _trainerPersons: TrainingPerson[];
  private readonly _compareTrainingPerson: (a, b) => boolean;

  constructor(private _ngxModalService: NgxModalService,
              private _translateObjectService: TranslateObjectService,
              // TODO: TemplateModalService can't inject without forwardRef()
              @Inject(forwardRef(() => TemplateModalService))
              private _templateModalService: TemplateModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.groups = [];
    this.athletePersons = [];
    this.trainerPersons = [];
    this._athletePersons = [];
    this._trainerPersons = [];
    this._compareTrainingPerson = (a, b) => a.person.id == b.person.id;
  }

  public preInitialize(afterCreateEvent: boolean, conversation: BaseConversation) {
    this._afterCreateEvent = afterCreateEvent;
    this._conversation = conversation;
  }

  async initialize(obj: T): Promise<boolean> {
    await super.initialize(obj);

    return await this.appHelper.tryLoad(async () => {
      this._userRoles = await this.participantRestApiService.getUserRoles();

      if (this._afterCreateEvent && this._conversation) {
        this.groups = (await this.participantRestApiService.getTrainingGroupsByBaseTraining({}, {
              count: PropertyConstant.pageSizeMax,
              conversationId: this._conversation.id,
              unassigned: true,
              canEdit: true
            },
            {eventId: this.data.id})
        ).list.map(x => x.group);

        await this.initializePersons(true, this._conversation.id);
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

        await this.initializePersons(false);
      }
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      await this.save(UserRoleEnum.ATHLETE, this._athletePersons, this.athletePersons);
      await this.save(UserRoleEnum.TRAINER, this._trainerPersons, this.trainerPersons);
    });
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  public onEditGroups = async () => {
    const dialogResult = await this._templateModalService.showSelectionTrainingGroupsModal(this.data, this.groups, {unassigned: true});
    if (dialogResult.result) {
      await this.participantRestApiService.updateGroupsByBaseTraining({list: dialogResult.data}, {}, {baseTrainingId: this.data.id});
      this.appHelper.updateArray(this.groups, dialogResult.data);
      await this.initializePersons(false);
    }
  };

  public onEditAthleteTrainingPersons = async () => {
    this.athletePersons = await this.editTrainingPersons(UserRoleEnum.ATHLETE, this.athletePersons);
  };

  public onEditTrainerTrainingPersons = async () => {
    this.trainerPersons = await this.editTrainingPersons(UserRoleEnum.TRAINER, this.trainerPersons);
  };

  private async editTrainingPersons(userRoleEnum: UserRoleEnum, items: TrainingPerson[]): Promise<TrainingPerson[]> {
    let resultItems: TrainingPerson[] = [];
    const dialogResult = await this._templateModalService.showSelectionTrainingPersonsModal(this.data, items, {userRoleEnum: userRoleEnum, unassigned: true});
    if (dialogResult.result) {
      this.updatePersonItems(userRoleEnum, items);
      resultItems = dialogResult.data;
    }
    return resultItems;
  }

  private async getTrainingPersons(event: BaseTraining, query: { userRoleEnum: UserRoleEnum, unassigned: boolean, conversationId?: number }) {
    const trainingPersonQuery: TrainingPersonQuery = {
      count: PropertyConstant.pageSizeMax,
      conversationId: query.conversationId,
      unassigned: query.unassigned,
      userRoleEnum: query.userRoleEnum
    };
    const result = (await this.participantRestApiService.getTrainingPersons({}, this.appHelper.getObjectWithoutUndefinedFields(trainingPersonQuery), {eventId: event.id})).list;
    this.updatePersonItems(query.userRoleEnum, result);
    return result;
  }

  private updatePersonItems(userRoleEnum: UserRoleEnum, items: TrainingPerson[]) {
    switch (userRoleEnum) {
      case UserRoleEnum.ATHLETE:
        this._athletePersons = this.appHelper.cloneObject(items);
        break;
      case UserRoleEnum.TRAINER:
        this._trainerPersons = this.appHelper.cloneObject(items);
        break;
    }
  }

  private async save(userRoleEnum: UserRoleEnum, items: TrainingPerson[], selectedItems: TrainingPerson[]) {
    const userRole = this._userRoles.find(x => x.userRoleEnum === userRoleEnum);
    const result = this.appHelper.getListChanges(items, selectedItems, this._compareTrainingPerson);
    for (const item of result.newItems) {
      item.userRole = userRole;
      const trainingPerson = await this.participantRestApiService.createTrainingPerson(item, {}, {baseTrainingId: this.data.id});
      const itemIndex = selectedItems.findIndex(x => x.person.id == trainingPerson.person.id);
      selectedItems[itemIndex] = trainingPerson;
    }
    for (const item of result.removedItems) {
      await this.participantRestApiService.removeTrainingPerson({baseTrainingId: this.data.id, trainingPersonId: item.id});
    }
  }

  private async initializePersons(unassigned: boolean, conversationId: number = null) {
    this.athletePersons = await this.getTrainingPersons(this.data, {userRoleEnum: UserRoleEnum.ATHLETE, unassigned: unassigned, conversationId: conversationId});
    this.trainerPersons = await this.getTrainingPersons(this.data, {userRoleEnum: UserRoleEnum.TRAINER, unassigned: unassigned, conversationId: conversationId});
  }

}
