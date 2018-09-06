import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {SportType} from '../../../../data/remote/model/sport-type';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {BreadcrumbItem} from '../../../../components/ngx-breadcrumb/bean/breadcrumb-item';
import {ActivatedRoute} from '@angular/router';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';

@Component({
  selector: 'app-stage-person-ranks',
  templateUrl: './stage-person-ranks.component.html',
  styleUrls: ['./stage-person-ranks.component.scss']
})
export class StagePersonRanksComponent implements OnInit {

  public readonly propertyConstant = PropertyConstant;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public stageType: StageType;

  @Input()
  public sportType: SportType;

  private readonly _breadcrumbItem: BreadcrumbItem;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _activatedRoute: ActivatedRoute) {
    this._breadcrumbItem = this._activatedRoute.routeConfig.data.breadcrumb as BreadcrumbItem;
  }

  async ngOnInit(): Promise<void> {
    if (!this.sportType) {
      const sportTypeId = await this._activatedRoute.snapshot.parent.params.id;
      // TODO: You should use another method to get sport type by id from server
      this.sportType = (await this._participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list.find(x => x.id == sportTypeId);
    }
    if (!this.stageType) {
      const stageTypeId = await this._activatedRoute.snapshot.params.id;
      // TODO: You should use another method to get stage type by id from server
      this.stageType = (await this._participantRestApiService.getStageTypes()).find(x => x.id == stageTypeId);
    }
    this._breadcrumbItem.name = this.stageType.name;
    await this.resetItems();
  }

  public fetchItems = async (query: PageQuery) => {
    if (!this.stageType || !this.sportType) {
      return;
    }
    return this._appHelper.arrayToPageContainer(await this._participantRestApiService.getStagePersonRanks({}, {stageTypeId: this.stageType.id}, {sportTypeId: this.sportType.id}));
  };

  public getAge(birthDate: string): number {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  }

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
