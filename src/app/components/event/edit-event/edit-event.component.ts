import {Component, Input, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../data/local/component/base/base-edit-component';
import {PropertyConstant} from '../../../data/local/property-constant';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {NamedObject} from '../../../data/remote/base/named-object';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {TrainingDiscriminator} from '../../../data/remote/model/training/base/training-discriminator';
import {BaseTraining} from '../../../data/remote/model/training/base/base-training';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {TrainingType} from '../../../data/remote/model/training/training/training-type';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {Training} from '../../../data/remote/model/training/training/training';
import {NgxModalService} from '../../ngx-modal/service/ngx-modal.service';
import {BaseConversation} from '../../../data/remote/model/chat/conversation/base/base-conversation';
import {Group} from '../../../data/remote/model/group/base/group';
import {TrainingPerson} from '../../../data/remote/model/training/training-person';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {UserRole} from '../../../data/remote/model/user-role';
import {TrainingPersonQuery} from '../../../data/remote/rest-api/query/training-person-query';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent<T extends BaseTraining> extends BaseEditComponent<T> implements OnInit {

  @Input()
  public date: Date;

  @Input()
  public conversation: BaseConversation;

  public readonly propertyConstantClass = PropertyConstant;
  public readonly trainingDiscriminatorClass = TrainingDiscriminator;
  public trainingTypes: NameWrapper<TrainingType>[];
  public selectedTrainingType: NameWrapper<TrainingType>;
  public eventTypes: NameWrapper<TrainingDiscriminator>[];
  public selectedEventType: NameWrapper<TrainingDiscriminator>;
  public groups: Group[];
  public athletePersons: TrainingPerson[];
  public trainerPersons: TrainingPerson[];
  private _userRoles: UserRole[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
    this.groups = [];
    this.athletePersons = [];
    this.trainerPersons = [];
  }

  async initialize(obj: T): Promise<boolean> {
    await super.initialize(obj);
    this.eventTypes = await this._translateObjectService.getTranslatedEnumCollection<TrainingDiscriminator>(TrainingDiscriminator, 'TrainingDiscriminator');
    this.selectedEventType = this.eventTypes[0];
    this._userRoles = await this.participantRestApiService.getUserRoles();

    obj.template = obj.template || false;
    obj.manualMode = obj.manualMode || true;
    obj.discriminator = obj.discriminator || this.selectedEventType.data;

    this.trainingTypes = await this._translateObjectService.getTranslatedEnumCollection<TrainingType>(TrainingType, 'TrainingTypeEnum');
    this.selectedTrainingType = this.trainingTypes[0];
    const training = (<BaseTraining>obj as Training);
    if (training.trainingType) {
      this.selectedTrainingType = this.trainingTypes.find(x => x.data === training.trainingType);
    } else {
      training.trainingType = this.selectedTrainingType.data;
    }

    if (!this.appHelper.isNewObject(obj)) {
      this.groups = (await this.participantRestApiService.getTrainingGroupsByBaseTraining({},
        {
          count: PropertyConstant.pageSizeMax,
          unassigned: false
        }, {eventId: obj.id})).list.map(x => x.group);

      await this.refreshTrainingPersons();
    }
    return true;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeEvent({eventId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    this.data.discriminator = this.data.discriminator || this.selectedEventType.data;

    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data.startTime = this.appHelper.getGmtDate(this.data.startTime);
        this.data.finishTime = this.appHelper.getGmtDate(this.data.finishTime);

        if (this.data.startTime && this.data.finishTime) {
          this.data.durationMs = Date.parse(this.data.finishTime.toString()) - Date.parse(this.data.startTime.toString());
        } else {
          this.data.durationMs = 1000;
        }

        if (this.data.eventPlan) {
          let leftBorderDate = new Date();
          if (this.data.eventPlan.startTime) {
            leftBorderDate = new Date(this.data.eventPlan.startTime);
          }
          leftBorderDate.setHours(0, 0, 0, 0);
          this.date.setHours(0, 0, 0, 0);

          if (leftBorderDate.getTime() > this.date.getTime()) {
            await this.appHelper.showErrorMessage('dateOutsidePlan');
          } else {
            this.data.daysOffset = Math.round((this.date.getTime() - leftBorderDate.getTime()) / (24 * 60 * 60 * 1000));
          }
        }

        this.appHelper.updateObject(this.data, await this.participantRestApiService.createBaseTraining(this.data));
        await this.setDefaultValueForConversation(this.data, this.conversation);
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.updateBaseTraining(this.data, {}, {id: this.data.id}));
      }
    });
  }

  public fetchSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public fetchAgeGroups = async (from: number, searchText: string) => {
    return this.participantRestApiService.getAgeGroups({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public fetchLocations = async (from: number, searchText: string) => {
    return this.participantRestApiService.getLocations({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public getKey(item: IdentifiedObject) {
    return item.id;
  }

  public getName(item: NamedObject) {
    return item.name;
  }

  public onTrainingTypeChanged(val: NameWrapper<TrainingType>) {
    (<BaseTraining>this.data as Training).trainingType = val.data;
  }

  private async setDefaultValueForConversation(event: BaseTraining, conversation: BaseConversation) {
    if (conversation) {
      this.groups = (await this.participantRestApiService.getTrainingGroupsByBaseTraining({}, {
        count: PropertyConstant.pageSizeMax,
        conversationId: this.conversation.id,
        unassigned: true
      }, {eventId: event.id})).list.map(x => x.group);

      await this.participantRestApiService.updateGroupsByBaseTraining({list: this.groups}, {}, {baseTrainingId: this.data.id});

      this.athletePersons = await this.getTrainingPersons(event, {userRoleEnum: UserRoleEnum.ATHLETE, unassigned: true, conversationId: conversation.id});
      this.trainerPersons = await this.getTrainingPersons(event, {userRoleEnum: UserRoleEnum.TRAINER, unassigned: true, conversationId: conversation.id});

      const athleteUserRole = this._userRoles.find(x => x.userRoleEnum === UserRoleEnum.ATHLETE);
      for (let i = 0; i < this.athletePersons.length; i++) {
        this.athletePersons[i].userRole = athleteUserRole;
        this.athletePersons[i] = await this.participantRestApiService.createTrainingPerson(this.athletePersons[i], {}, {baseTrainingId: this.data.id});
      }
      const trainerUserRole = this._userRoles.find(x => x.userRoleEnum === UserRoleEnum.TRAINER);
      for (let i = 0; i < this.trainerPersons.length; i++) {
        this.trainerPersons[i].userRole = trainerUserRole;
        this.trainerPersons[i] = await this.participantRestApiService.createTrainingPerson(this.trainerPersons[i], {}, {baseTrainingId: this.data.id});
      }
    }
  }

  private async getTrainingPersons(event: BaseTraining, query: { userRoleEnum: UserRoleEnum, unassigned: boolean, conversationId?: number }) {
    const trainingPersonQuery: TrainingPersonQuery = {
      count: PropertyConstant.pageSizeMax,
      conversationId: query.conversationId,
      unassigned: query.unassigned,
      userRoleEnum: query.userRoleEnum
    };
    this.appHelper.removeUndefinedField(trainingPersonQuery);
    return (await this.participantRestApiService.getTrainingPersons({}, trainingPersonQuery, {eventId: event.id})).list;
  }

  public onEventTypeChanged(val: NameWrapper<TrainingDiscriminator>): void {
    this.data.discriminator = val.data;
  }

  public onEditGroups = async () => {
    await this._ngxModalService.showSelectionGroupsModal(this.groups, async selectedItems => {
      this.groups = selectedItems;
      await this.appHelper.trySave(async () => {
        await this.participantRestApiService.updateGroupsByBaseTraining({list: this.groups}, {}, {baseTrainingId: this.data.id});
      });
    });
  };

  public onEditAthleteTrainingPersons = async () => {
    this.athletePersons = await this.editTrainingPersons(UserRoleEnum.ATHLETE, this.athletePersons);
  };

  public onEditTrainerTrainingPersons = async () => {
    this.trainerPersons = await this.editTrainingPersons(UserRoleEnum.TRAINER, this.trainerPersons);
  };

  private async editTrainingPersons(userRoleEnum: UserRoleEnum, items: TrainingPerson[]): Promise<TrainingPerson[]> {
    const userRole = this._userRoles.find(x => x.userRoleEnum === userRoleEnum);
    const compare: (a, b) => boolean = (a, b) => a.person.id == b.person.id;
    let resultItems: TrainingPerson[] = [];
    await this._ngxModalService.showSelectionTrainingPersonsModal(this.data, {userRoleEnum: userRoleEnum, unassigned: true}, items, async selectedItems => {
      const result = this.appHelper.getListChanges(items, selectedItems, compare);
      await this.appHelper.trySave(async () => {
        for (const item of result.newItems) {
          item.userRole = userRole;
          const trainingPerson = await this.participantRestApiService.createTrainingPerson(item, {}, {baseTrainingId: this.data.id});
          const itemIndex = selectedItems.findIndex(x => x.person.id == trainingPerson.person.id);
          selectedItems[itemIndex] = trainingPerson;
        }
        for (const item of result.removedItems) {
          await this.participantRestApiService.removeTrainingPerson({baseTrainingId: this.data.id, trainingPersonId: item.id});
        }
        resultItems = selectedItems;
      });
    }, compare);
    return resultItems;
  }

  private async refreshTrainingPersons(event: BaseTraining = this.data) {
    this.athletePersons = await this.getTrainingPersons(event, {userRoleEnum: UserRoleEnum.ATHLETE, unassigned: false});
    this.trainerPersons = await this.getTrainingPersons(event, {userRoleEnum: UserRoleEnum.TRAINER, unassigned: false});
  }

}
