import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Tab} from '../../../../../../data/local/tab';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {UserRoleEnum} from '../../../../../../data/remote/model/user-role-enum';
import {TrainingGroup} from '../../../../../../data/remote/model/training-group';
import {TrainingPersonsSelectionComponent} from '../../../../../../components/training-persons-selection/training-persons-selection.component';
import {PropertyConstant} from '../../../../../../data/local/property-constant';

@Component({
  selector: 'app-game-step-persons-page',
  templateUrl: './game-step-persons-page.component.html',
  styleUrls: ['./game-step-persons-page.component.scss']
})
export class GameStepPersonsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  private _groupId: number;
  private queryParamsSubscription: any;

  @ViewChild(TrainingPersonsSelectionComponent)
  public trainingPersonsSelectionComponent: TrainingPersonsSelectionComponent;

  public groupTabs: Tab[];
  public userRoleTabs: Tab[];
  public gameId: number;
  public userRoleEnum: UserRoleEnum;
  public trainingGroup: TrainingGroup;
  public valid: boolean;

  constructor(private _activatedRoute: ActivatedRoute,
              private _participantRestApiService: ParticipantRestApiService,
              private _router: Router) {
    this.groupTabs = [];
    this.userRoleTabs = [];

    this.userRoleEnum = UserRoleEnum.ATHLETE;
    this.valid = false;
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    try {
      this.gameId = await this._activatedRoute.snapshot.parent.parent.params.id;
      if (!this.gameId) {
        return;
      }

      const trainingGroups = (await this._participantRestApiService.getTrainingGroupsByBaseTraining({}, {count: PropertyConstant.pageSizeMax}, {eventId: this.gameId})).list;
      if (trainingGroups.length < 1) {
        return;
      }
      const defaultGroupId = trainingGroups[0].group.id;

      const baseRouterLink = '/event/' + this.gameId + '/game/step/2';
      this.trainingGroup = trainingGroups.find(x => x.group.id == defaultGroupId);

      for (let i = 0; i < trainingGroups.length; i++) {
        const trainingGroup = trainingGroups[i];

        const groupTab = new Tab();
        groupTab.name = trainingGroup.group.name;
        groupTab.routerLink = baseRouterLink;
        groupTab.queryParams = {groupId: trainingGroup.group.id};

        this.groupTabs.push(groupTab);
      }

      this.queryParamsSubscription = this._activatedRoute.queryParams.subscribe(async params => {
        // TODO: Fix double call this method
        const groupId = params['groupId'];
        const userRoleEnum = params['userRoleEnum'];

        let navigate = false;

        if (!groupId) {
          this._groupId = defaultGroupId;
          this.trainingGroup = trainingGroups.find(x => x.group.id == this._groupId);
          this.updateUserRoleTabs(baseRouterLink);
          navigate = true;
        } else {
          if (this._groupId != groupId) {
            this._groupId = groupId;
            this.trainingGroup = trainingGroups.find(x => x.group.id == this._groupId);
            this.updateUserRoleTabs(baseRouterLink);
            navigate = true;
          }
        }
        if (!userRoleEnum) {
          if (!this.userRoleEnum) {
            this.userRoleEnum = UserRoleEnum.ATHLETE;
          }
          navigate = true;
        } else {
          if (this.userRoleEnum !== userRoleEnum) {
            this.userRoleEnum = userRoleEnum;
            navigate = true;
          }
        }

        if (navigate) {
          await this._router.navigate([], {
            relativeTo: this._activatedRoute,
            queryParams: {groupId: this._groupId, userRoleEnum: this.userRoleEnum}
          });

          this.trainingPersonsSelectionComponent.userRoleEnum = this.userRoleEnum;
          this.trainingPersonsSelectionComponent.trainingId = this.gameId;
          this.trainingPersonsSelectionComponent.trainingGroup = this.trainingGroup;
          await this.trainingPersonsSelectionComponent.initialize();
        }
      });
      this.valid = true;
    } catch (e) {
    }
  }

  private updateUserRoleTabs(routerLink: string): void {
    const athletesTab = new Tab();
    athletesTab.nameKey = 'athletes';
    athletesTab.routerLink = routerLink;
    athletesTab.queryParams = {groupId: this._groupId, userRoleEnum: UserRoleEnum.ATHLETE};

    const trainersTab = new Tab();
    trainersTab.nameKey = 'trainers';
    trainersTab.routerLink = routerLink;
    trainersTab.queryParams = {groupId: this._groupId, userRoleEnum: UserRoleEnum.TRAINER};

    this.userRoleTabs = [athletesTab, trainersTab];
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}
