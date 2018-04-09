import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {UserRoleEnum} from '../../data/remote/model/user-role-enum';
import {TrainingPersonQuery} from '../../data/remote/rest-api/query/training-person-query';
import {BaseSelection} from '../../data/local/component/base/base-selection';
import {AppHelper} from '../../utils/app-helper';
import {TrainingPersonItemViewModel} from '../../data/local/view-model/event/training-person-item-view-model';
import {PageContainer} from '../../data/remote/bean/page-container';
import {SportRole} from '../../data/remote/model/sport-role';
import {Game} from '../../data/remote/model/training/game/game';
import {UserRole} from '../../data/remote/model/user-role';
import {TrainingGroup} from '../../data/remote/model/training-group';
import {TrainingPerson} from '../../data/remote/model/training/training-person';

@Component({
  selector: 'app-training-persons-selection',
  templateUrl: './training-persons-selection.component.html',
  styleUrls: ['./training-persons-selection.component.scss']
})
export class TrainingPersonsSelectionComponent extends BaseSelection<TrainingPersonItemViewModel, TrainingPersonQuery> implements OnInit, AfterViewInit {

  private readonly _numbers: number[];
  private _sportRoles: SportRole[];
  private _userRole: UserRole;
  private _userRoles: UserRole[];

  @Input()
  public trainingId: number;

  @Input()
  public trainingGroup: TrainingGroup;

  @Input()
  public userRoleEnum: UserRoleEnum;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              _appHelper: AppHelper) {
    super(_appHelper);

    this.getItems = this.getTrainingPersons;
    this.query.unassigned = true;
    this._numbers = [];
  }

  async ngOnInit() {
    for (let i = 1001; i < 1300; i++) {
      this._numbers.push(i);
    }

    this._userRoles = await this._participantRestApiService.getUserRoles();
  }

  async ngAfterViewInit() {
  }

  public async initialize() {
    this.query.userRole = this.userRoleEnum;
    this.query.groupId = this.trainingGroup.group.id;

    super.ngAfterViewInit();

    this._userRole = this._userRoles.find(x => x.userRoleEnum === this.userRoleEnum);

    const trainingPersonPageContainer = await this._participantRestApiService.getTrainingPersons({},
      {
        unassigned: false,
        userRole: this.userRoleEnum,
        groupId: this.trainingGroup.group.id
      },
      {baseTrainingId: this.trainingId});

    const game = (await this._participantRestApiService.getBaseTraining({id: this.trainingId})) as Game;
    this._sportRoles = await this._participantRestApiService.getSportRolesBySportType({id: game.sportType.id});

    await super.initialize(trainingPersonPageContainer.list.map(x => {
      const trainingPersonItemViewModel = new TrainingPersonItemViewModel(x);
      trainingPersonItemViewModel.initialize();
      trainingPersonItemViewModel.numbers = this._numbers;
      trainingPersonItemViewModel.sportRoles = this._sportRoles;

      if (this.userRoleEnum === UserRoleEnum.ATHLETE) {
        trainingPersonItemViewModel.assigned = true;
      }
      return trainingPersonItemViewModel;
    }));
  }

  getTrainingPersons = async (pageQuery: TrainingPersonQuery) => {
    const trainingPersonPageContainer = await this._participantRestApiService.getTrainingPersons({}, pageQuery, {baseTrainingId: this.trainingId});
    const pageContainer = new PageContainer(trainingPersonPageContainer.list.map(x => new TrainingPersonItemViewModel(x)));
    pageContainer.size = trainingPersonPageContainer.size;
    pageContainer.size = trainingPersonPageContainer.size;
    return pageContainer;
  };

  public async onNextPage() {
    await this.update();
  }

  async onSelected(item: TrainingPersonItemViewModel) {
    try {
      if (this.userRoleEnum === UserRoleEnum.ATHLETE) {
        item.data.number = this.getDefaultNumber();
        item.sportRoles = this._sportRoles;
        // TODO: Get default sportRole from server
        item.data.sportRole = item.sportRoles[0];
        item.assigned = true;
      }
      item.data.userRole = this._userRole;
      item.data.trainingGroup = new TrainingGroup();
      item.data.trainingGroup.id = this.trainingGroup.id;

      const trainingPerson = await this._participantRestApiService.createTrainingPerson(item.data, {}, {baseTrainingId: this.trainingId});
      item.update(trainingPerson);

      super.onSelected(item);

      if (this.userRoleEnum === UserRoleEnum.ATHLETE) {
        this.updateNumbers();
      }
    } catch (e) {
      await this._appHelper.showErrorMessage(e);
    }
  }

  async onUnselected(item: TrainingPersonItemViewModel) {
    try {
      if (this.userRoleEnum === UserRoleEnum.ATHLETE) {
        item.assigned = false;
      }

      await this._participantRestApiService.removeTrainingPerson({
        baseTrainingId: item.data.baseTraining.id,
        trainingPersonId: item.data.id
      });
      const trainingPerson = new TrainingPerson();
      trainingPerson.person = item.data.person;

      super.onUnselected(item);

      if (this.userRoleEnum === UserRoleEnum.ATHLETE) {
        this.updateNumbers();
      }
    } catch (e) {
      await this._appHelper.showErrorMessage(e);
    }
  }

  private updateNumbers() {
    const usedNumbers = this.selectedItems.filter(x => x.data.number !== undefined && x.data.number != null).map(x => x.data.number);
    for (let i = 0; i < this.selectedItems.length; i++) {
      const item = this.selectedItems[i];
      const numbers = this._appHelper.except(this._numbers, usedNumbers);
      if (item.data.number !== undefined && item.data.number != null) {
        numbers.push(item.data.number);
      }
      item.numbers = numbers.sort();
    }
  }

  private getDefaultNumber(): number {
    const usedNumbers = this.selectedItems.filter(x => x.data.number !== undefined && x.data.number != null).map(x => x.data.number);
    return this._appHelper.except(this._numbers, usedNumbers)[0];
  }

}



