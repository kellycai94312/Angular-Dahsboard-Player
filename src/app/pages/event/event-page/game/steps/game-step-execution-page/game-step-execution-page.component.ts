import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {Tab} from '../../../../../../data/local/tab';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingGroup} from '../../../../../../data/remote/model/training-group';
import {PersonMeasure} from '../../../../../../data/remote/bean/person-measure';
import {ExerciseExecMeasureValue} from '../../../../../../data/remote/model/training/exercise-exec-measure-value';
import {AppHelper} from '../../../../../../utils/app-helper';
import {TrainingPerson} from '../../../../../../data/remote/model/training/training-person';

@Component({
  selector: 'app-game-step-execution-page',
  templateUrl: './game-step-execution-page.component.html',
  styleUrls: ['./game-step-execution-page.component.scss']
})
export class GameStepExecutionPageComponent implements OnInit, OnDestroy {

  private _queryParamsSubscription: any;
  private _trainingGroups: TrainingGroup[];

  public readonly totalTrainingPartId: number;

  public trainingPartTabs: Tab[];
  public trainingGroupTabs: Tab[];

  public tableColumns: string[];
  public personMeasures: PersonMeasure<any>[];

  public gameId: number;
  public trainingPartId: number;
  public trainingGroupId: number;
  private _defaultTrainingPartId: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._trainingGroups = [];
    this.totalTrainingPartId = 0;
    this.trainingPartTabs = [];
    this.trainingGroupTabs = [];
    this.tableColumns = [];
    this.personMeasures = [];
  }

  async ngOnInit() {
    this.gameId = await this._activatedRoute.snapshot.parent.parent.params.id;

    if (!this.gameId) {
      return;
    }

    const baseRouterLink = '/event/' + this.gameId + '/game/step/3';

    if (!(await this.initTrainingPartTabs(baseRouterLink))) {
      return;
    }

    this._trainingGroups = await this._participantRestApiService.getTrainingGroupsByBaseTraining({baseTrainingId: this.gameId});
    if (this._trainingGroups.length < 1) {
      return;
    }
    const defaultTrainingGroupId = this._trainingGroups[0].id;

    this._queryParamsSubscription = this._activatedRoute.queryParams.subscribe(async params => {
      // TODO: Fix double call this method
      const trainingPartId = params['trainingPartId'];
      const trainingGroupId = params['trainingGroupId'];

      let navigate = false;

      if (!trainingPartId) {
        this.trainingPartId = this._defaultTrainingPartId;
        this.updateTrainingGroupTabs(baseRouterLink);
        navigate = true;
      } else {
        if (this.trainingPartId != trainingPartId) {
          this.trainingPartId = trainingPartId;
          this.updateTrainingGroupTabs(baseRouterLink);
          navigate = true;
        }
      }

      if (!trainingGroupId) {
        if (!this.trainingGroupId) {
          this.trainingGroupId = defaultTrainingGroupId;
        }
        navigate = true;
      } else {
        if (this.trainingGroupId !== trainingGroupId) {
          this.trainingGroupId = trainingGroupId;
          navigate = true;
        }
      }

      if (navigate) {
        await this._router.navigate([], {
          relativeTo: this._activatedRoute,
          queryParams: {trainingPartId: this.trainingPartId, trainingGroupId: this.trainingGroupId}
        });

        if (this.trainingPartId || this.trainingPartId == 0) {
          await this.updateContent();
        }
      }
    });
  }

  public updateTrainingGroupTabs(routerLink: string): void {
    this.trainingGroupTabs = [];
    for (let i = 0; i < this._trainingGroups.length; i++) {
      const trainingGroup = this._trainingGroups[i];
      const trainingGroupTab = new Tab();
      trainingGroupTab.name = trainingGroup.group.name;
      trainingGroupTab.routerLink = routerLink;
      trainingGroupTab.queryParams = {trainingPartId: this.trainingPartId, trainingGroupId: trainingGroup.id};
      this.trainingGroupTabs.push(trainingGroupTab);
    }
  }

  public async updateContent() {
    if (this.trainingPartId != this.totalTrainingPartId) {
      this.personMeasures = [];
      this.personMeasures = await this._participantRestApiService.getPersonMeasures({
        gameId: this.gameId,
        trainingGroupId: this.trainingGroupId,
        trainingPartId: this.trainingPartId
      });

      if (this.personMeasures.length > 0) {
        this.tableColumns = this.personMeasures[0].measureValues.map(x => x.exerciseExecMeasure.exerciseMeasure.measure.measureParameter.name);
      }
    } else {
      this.personMeasures = [];
      this.personMeasures = await this._participantRestApiService.getTotalPersonMeasures({
        gameId: this.gameId,
        trainingGroupId: this.trainingGroupId
      });

      if (this.personMeasures.length > 0) {
        this.tableColumns = this.personMeasures[0].measureValues.map(x => x.exerciseMeasure.measure.measureParameter.name);
      }
    }
  }

  ngOnDestroy(): void {
    if (this._queryParamsSubscription) {
      this._queryParamsSubscription.unsubscribe();
    }
  }

  public async onUpdateExerciseExecMeasureValue(trainingPerson: TrainingPerson, exerciseExecMeasureValue: ExerciseExecMeasureValue) {
    if (this._appHelper.isNewObject(exerciseExecMeasureValue)) {
      exerciseExecMeasureValue.trainingPerson = trainingPerson;
      const savedExerciseExecMeasureValue = await this._participantRestApiService.createExerciseExecMeasureValue(exerciseExecMeasureValue, {}, {
        baseTrainingId: this.gameId
      });
      exerciseExecMeasureValue.id = savedExerciseExecMeasureValue.id;
      exerciseExecMeasureValue.version = savedExerciseExecMeasureValue.version;
    } else {
      const savedExerciseExecMeasureValue = await this._participantRestApiService.updateExerciseExecMeasureValue(exerciseExecMeasureValue, {}, {
        baseTrainingId: this.gameId,
        exerciseExecMeasureValueId: exerciseExecMeasureValue.id
      });
      exerciseExecMeasureValue.version = savedExerciseExecMeasureValue.version;
    }
  }

  private async initTrainingPartTabs(routerLink: string): Promise<boolean> {
    const trainingParts = await this._participantRestApiService.getTrainingParts({id: this.gameId});
    if (trainingParts.length < 1) {
      return false;
    }

    for (let i = 0; i < trainingParts.length; i++) {
      const trainingPart = trainingParts[i];

      const trainingPartTab = new Tab();
      trainingPartTab.name = trainingPart.name;
      trainingPartTab.routerLink = routerLink;
      trainingPartTab.queryParams = {trainingPartId: trainingPart.id};

      this.trainingPartTabs.push(trainingPartTab);
    }
    this._defaultTrainingPartId = trainingParts[0].id;

    const totalTrainingPartTab = new Tab();
    totalTrainingPartTab.nameKey = 'total';
    totalTrainingPartTab.routerLink = routerLink;
    totalTrainingPartTab.queryParams = {trainingPartId: this.totalTrainingPartId};
    this.trainingPartTabs.push(totalTrainingPartTab);
    return true;
  }

}
