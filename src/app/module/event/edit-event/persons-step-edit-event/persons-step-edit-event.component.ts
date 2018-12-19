import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-persons-step-edit-event',
  templateUrl: './persons-step-edit-event.component.html',
  styleUrls: ['./persons-step-edit-event.component.scss']
})
export class PersonsStepEditEventComponent<T extends BaseTraining> extends BaseEditComponent<T> implements OnInit {

  public athletePersons: TrainingPerson[];
  public trainerPersons: TrainingPerson[];
  private _userRoles: UserRole[];
  private _afterCreateEvent: boolean;
  private _conversation: BaseConversation;
  private _athletePersons: TrainingPerson[];
  private _trainerPersons: TrainingPerson[];
  private readonly _compareTrainingPerson: (a, b) => boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
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
        await this.initializePersons(true, this._conversation.id);
      } else {
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

  public onEditAthleteTrainingPersons = async () => {
    this.athletePersons = await this.editTrainingPersons(UserRoleEnum.ATHLETE, this.athletePersons);
  };

  public onEditTrainerTrainingPersons = async () => {
    this.trainerPersons = await this.editTrainingPersons(UserRoleEnum.TRAINER, this.trainerPersons);
  };

  private async editTrainingPersons(userRoleEnum: UserRoleEnum, items: TrainingPerson[]): Promise<TrainingPerson[]> {
    let resultItems: TrainingPerson[] = [];
    await this._ngxModalService.showSelectionTrainingPersonsModal(this.data, {userRoleEnum: userRoleEnum, unassigned: true}, items, async selectedItems => {
      this.updatePersonItems(userRoleEnum, items);
      resultItems = selectedItems;
    }, this._compareTrainingPerson);
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
