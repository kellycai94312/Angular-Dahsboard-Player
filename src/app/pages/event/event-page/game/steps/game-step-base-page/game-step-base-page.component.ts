import { Component, OnInit } from '@angular/core';
import { Game } from '../../../../../../data/remote/model/training/game/game';
import { Location } from '../../../../../../data/remote/model/location';
import { SportType } from '../../../../../../data/remote/model/sport-type';
import { ParticipantRestApiService } from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHelper } from '../../../../../../utils/app-helper';
import { TrainingState } from '../../../../../../data/remote/misc/training-state';
import { TrainingPart } from '../../../../../../data/remote/model/training/training-part';
import { TrainingPartType } from '../../../../../../data/remote/misc/training-part-type';
import { Group } from '../../../../../../data/remote/model/group/base/group';
import { ListRequest } from '../../../../../../data/remote/request/list-request';
import { ModalSelectPageComponent } from '../../../../../../components/modal-select-page/modal-select-page.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HashSet } from '../../../../../../data/local/hash-set';
import { TranslateService } from '@ngx-translate/core';
import { PropertyConstant } from '../../../../../../data/local/property-constant';
import { GroupQuery } from '../../../../../../data/remote/rest-api/query/group-query';
import { GroupTypeEnum } from '../../../../../../data/remote/model/group/base/group-type-enum';
import { NamedObjectItemComponent } from '../../../../../../components/named-object-item/named-object-item.component';
import { UserRoleEnum } from "../../../../../../data/remote/model/user-role-enum";

@Component({
  selector: 'app-game-step-base-page',
  templateUrl: './game-step-base-page.component.html',
  styleUrls: ['./game-step-base-page.component.scss']
})
export class GameStepBasePageComponent implements OnInit {

  public game: Game;
  public trainingParts: TrainingPart[];
  public trainingPart: TrainingPart;
  public groups: Group[];
  public locations: Location[];
  public sportTypes: SportType[];

  constructor(public appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _translateService: TranslateService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper) {
    this.game = new Game();
    this.game.startTime = new Date(Date.now() + 15 * 60 * 1000);
    this.trainingParts = [];
    this.trainingPart = new TrainingPart();
    this.trainingPart.durationMs = 5 * 60 * 1000;
    this.groups = [];
    this.locations = [];
    this.sportTypes = [];
  }

  async ngOnInit() {
    await this.initialize();
  }

  private async initialize(): Promise<void> {
    const id = this._activatedRoute.snapshot.parent.parent.params.id;
    if (id != 0) {
      this.game = (await this._participantRestApiService.getBaseTraining({id: id})) as Game;
      this.trainingParts = await this._participantRestApiService.getTrainingParts({id: this.game.id});
      this.groups = (await this._participantRestApiService.getTrainingGroupsByBaseTraining({baseTrainingId: this.game.id})).map(x => x.group);
    }

    this.locations = (await this._participantRestApiService.getLocations({count: 999999})).list;
    this.sportTypes = (await this._participantRestApiService.getSportTypes({count: 999999})).list;
  }

  public async onSave() {
    try {
      if (this.appHelper.isNewObject(this.game)) {
        this.game.startTime = this.appHelper.getGmtDate(this.game.startTime);
        this.game.manualMode = true;
        this.game.durationMs = 1000;
        this.game.template = false;
        this.game.trainingState = TrainingState[TrainingState.DRAFT];
        this.game = (await this._participantRestApiService.createBaseTraining(this.game)) as Game;
        await this._router.navigate(['/event/' + this.game.id + '/game/step/']);
      } else {
        this.game.startTime = this.appHelper.getGmtDate(this.game.startTime);
        this.game = (await this._participantRestApiService.updateBaseTraining(this.game, null, {id: this.game.id})) as Game;
        await this.initialize();
      }
      await  this.appHelper.showSuccessMessage('saved');
    } catch (e) {
      await this.appHelper.showErrorMessage('saveError');
    }
  }

  public async onSetTrainingPartDuration(trainingPart: TrainingPart, value: Date) {
    trainingPart.durationMs = (value.getHours() * 60 + value.getMinutes()) * 60 * 1000;
    if (!this._appHelper.isNewObject(trainingPart)) {
      await this.onUpdateTrainingPart(trainingPart);
    }
  }

  public onGetTrainingPartDuration(trainingPart: TrainingPart): Date {
    return new Date(0, 0, 0, 0, 0, 0, trainingPart.durationMs);
  }

  public async onAddTrainingPart(item: TrainingPart) {
    try {
      item.type = TrainingPartType[TrainingPartType.BASIC];
      const trainingPart = await this._participantRestApiService.createTrainingPart(item, {}, {baseTrainingId: this.game.id});
      this.trainingParts.push(trainingPart);
      item.name = null;
      item.durationMs = 5 * 60 * 1000;
    } catch (e) {
      await this._appHelper.showErrorMessage('addError');
    }
  }

  public async onUpdateTrainingPart(item: TrainingPart) {
    try {
      await this._participantRestApiService.updateTrainingPart(item, {}, {
        baseTrainingId: this.game.id,
        trainingPartId: item.id
      });
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
  }

  public async onRemoveTrainingPart(item: TrainingPart) {
    try {
      await this._participantRestApiService.removeTrainingPart({
        baseTrainingId: item.baseTraining.id,
        trainingPartId: item.id
      });
      this.appHelper.removeItem(this.trainingParts, item);
    } catch (e) {
      await this._appHelper.showErrorMessage('removeError');
    }
  }

  public isValidTrainingPart(item: TrainingPart): boolean {
    return item.name != null &&
      item.name !== '' &&
      item.durationMs != null &&
      !this.appHelper.isNewObject(this.game);
  }

  public async onEditGroups() {
    const selectedSet = new HashSet<Group>();
    selectedSet.addAll(this.groups);

    const groupQuery = new GroupQuery();
    groupQuery.from = 0;
    groupQuery.count = PropertyConstant.pageSize;
    groupQuery.groupTypeEnum = GroupTypeEnum[GroupTypeEnum.TEAM];
    groupQuery.userRoleEnum = UserRoleEnum[UserRoleEnum.TRAINER];
    groupQuery.all = false;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    ref.componentInstance.header = await this._translateService.get('edit').toPromise();
    ref.componentInstance.component = NamedObjectItemComponent;
    ref.componentInstance.selectedSet = selectedSet;
    ref.componentInstance.getListAsync = async (name: string, from: number) => {
      groupQuery.name = name;
      groupQuery.from = from;
      return await this._participantRestApiService.getGroups(groupQuery);
    };
    ref.componentInstance.onSave = async () => {
      try {
        const items = await this._participantRestApiService.updateGroupsByBaseTraining(new ListRequest(selectedSet.data),
          {},
          {baseTrainingId: this.game.id});
        this.groups = items.map(x => x.group);
        ref.dismiss();
      } catch (e) {
        await this._appHelper.showErrorMessage('gameMustHaveTwoTeams');
      }
    };
  }

}
