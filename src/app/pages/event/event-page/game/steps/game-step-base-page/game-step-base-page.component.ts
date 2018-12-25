import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../../../../data/remote/model/training/game/game';
import {Location} from '../../../../../../data/remote/model/location';
import {SportType} from '../../../../../../data/remote/model/sport-type';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppHelper} from '../../../../../../utils/app-helper';
import {TrainingState} from '../../../../../../data/remote/misc/training-state';
import {TrainingPart} from '../../../../../../data/remote/model/training/training-part';
import {TrainingPartType} from '../../../../../../data/remote/misc/training-part-type';
import {ListRequest} from '../../../../../../data/remote/request/list-request';
import {ModalSelectPageComponent} from '../../../../../../components/modal-select-page/modal-select-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {GroupTypeEnum} from '../../../../../../data/remote/model/group/base/group-type-enum';
import {NamedObjectItemComponent} from '../../../../../../components/named-object-item/named-object-item.component';
import {UserRoleEnum} from '../../../../../../data/remote/model/user-role-enum';
import {SplitButtonItem} from '../../../../../../components/ngx-split-button/bean/split-button-item';
import {MeasureParameterEnum} from '../../../../../../data/remote/misc/measure-parameter-enum';
import {interval} from 'rxjs';
import {ISubscription} from 'rxjs/src/Subscription';
import {GroupScore} from '../../../../../../data/remote/model/training/game/group-score';
import {NgxButtonType} from '../../../../../../components/ngx-button/model/ngx-button-type';
import {flatMap, timeInterval} from 'rxjs/operators';

@Component({
  selector: 'app-game-step-base-page',
  templateUrl: './game-step-base-page.component.html',
  styleUrls: ['./game-step-base-page.component.scss']
})
export class GameStepBasePageComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly ngxButtonTypeClass = NgxButtonType;
  public game: Game;
  public trainingParts: TrainingPart[];
  public trainingPart: TrainingPart;
  public locations: Location[];
  public sportTypes: SportType[];

  public readonly splitButtonItems: SplitButtonItem[];

  private _groupScoresSubscription: ISubscription;

  constructor(public appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _translateService: TranslateService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper) {
    this.game = new Game();
    this.game.startTime = new Date(Date.now() + 15 * 60 * 1000);
    this.game.groupScores = [];
    this.trainingParts = [];
    this.trainingPart = new TrainingPart();
    this.trainingPart.durationMs = 5 * 60 * 1000;
    this.locations = [];
    this.sportTypes = [];

    this.splitButtonItems = [
      {
        nameKey: 'save',
        default: true,
        callback: async () => {
          await this._appHelper.trySave(async () => {
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
          });
        }
      },
      {
        nameKey: 'stop',
        callback: async () => {
          await this._appHelper.trySave(async () => {
            this.game = <Game>(await this._participantRestApiService.updateBaseTrainingState({trainingState: TrainingState.STOP}, {}, {id: this.game.id}));
          });
        }
      }
    ];
  }

  async ngOnInit() {
    await this.initialize();
  }

  ngOnDestroy() {
    this._appHelper.unsubscribe(this._groupScoresSubscription);
  }

  private async initialize(): Promise<void> {
    const id = this._activatedRoute.snapshot.parent.parent.params.id;
    if (id != 0) {
      this.game = (await this._participantRestApiService.getBaseTraining({
        id: id,
        measureParameterEnum: MeasureParameterEnum.GOALS
      })) as Game;
      this.trainingParts = await this._participantRestApiService.getTrainingParts({id: this.game.id});
      this._groupScoresSubscription = interval(5 * 1000)
        .pipe(
          timeInterval(),
          flatMap(async () => await this._participantRestApiService.getGameGroupScores({
              gameId: id,
              measureParameterEnum: MeasureParameterEnum.GOALS
            })
          )
        ).subscribe(data => this.game.groupScores = data);
    }

    this.locations = (await this._participantRestApiService.getLocations({count: PropertyConstant.pageSizeMax})).list;
    this.sportTypes = (await this._participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
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

  public onAddTrainingPart = async (item: TrainingPart) => {
    await this._appHelper.trySave(async () => {
      item.type = TrainingPartType[TrainingPartType.BASIC];
      const trainingPart = await this._participantRestApiService.createTrainingPart(item, {}, {baseTrainingId: this.game.id});
      this.trainingParts.push(trainingPart);
      item.name = null;
      item.durationMs = 5 * 60 * 1000;
    });
  };

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

  public onRemoveTrainingPart = async (item: TrainingPart) => {
    await this._appHelper.tryRemove(async () => {
      await this._participantRestApiService.removeTrainingPart({
        baseTrainingId: item.baseTraining.id,
        trainingPartId: item.id
      });
      this.appHelper.removeItem(this.trainingParts, item);
    });
  };

  public isValidTrainingPart(item: TrainingPart): boolean {
    return item.name != null &&
      item.name !== '' &&
      item.durationMs != null &&
      !this.appHelper.isNewObject(this.game);
  }

  public onEditGroups = async () => {
    const groupQuery = new GroupQuery();
    groupQuery.from = 0;
    groupQuery.count = PropertyConstant.pageSize;
    groupQuery.groupTypeEnum = GroupTypeEnum.TEAM;
    groupQuery.userRoleEnum = UserRoleEnum.TRAINER;
    groupQuery.all = false;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.pageQuery = groupQuery;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getGroups(pageQuery);
    };
    componentInstance.onSave = async selectedItems => {
      try {
        const items = await this._participantRestApiService.updateGroupsByBaseTraining(new ListRequest(selectedItems),
          {},
          {baseTrainingId: this.game.id});
        this.game.groupScores = items.map(trainingGroup => new GroupScore(trainingGroup.group, '0'));
        ref.dismiss();
      } catch (e) {
        await this._appHelper.showErrorMessage('gameMustHaveTwoTeams');
      }
    };
    await componentInstance.initialize(this.game.groupScores.map(groupScore => groupScore.group));
  };

}
