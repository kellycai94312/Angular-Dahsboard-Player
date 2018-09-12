import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../person.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../../utils/app-helper';
import {Person} from '../../../../data/remote/model/person';
import {SportType} from '../../../../data/remote/model/sport-type';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';

@Component({
  selector: 'app-person-stage-standards',
  templateUrl: './person-stage-standards.component.html',
  styleUrls: ['./person-stage-standards.component.scss']
})
export class PersonStageStandardsComponent implements OnInit, OnDestroy {

  public readonly sexEnum = SexEnum;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly person: Person;

  public stages: Stage[];
  public selectedStage: Stage;

  private readonly _sportTypeSubscription: ISubscription;

  private _sportType: SportType;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.person = this._personService.personViewModel.data;
    this._sportTypeSubscription = this._personService.sportTypeSubject.subscribe(async value => {
      this._sportType = value;
      await this.resetItems();
    });
  }

  async ngOnInit() {
    this.stages = await this._participantRestApiService.getStages();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async onStageChanged(val: Stage) {
    await this.resetItems();
  }

  public fetchItems = async (query: PageQuery) => {
    if (!this._sportType || !this.selectedStage) {
      return null;
    }
    return await this._participantRestApiService.getStageStandardMeasureValues({}, query, {personId: this.person.id, sportTypeId: this._sportType.id, stageId: this.selectedStage.id});
  };

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
