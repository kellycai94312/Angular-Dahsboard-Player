import {Component, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../data/local/property-constant';
import {SportType} from '../../../data/remote/model/sport-type';
import {Stage} from '../../../data/remote/model/stage/stage';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {NamedObject} from '../../../data/remote/base/named-object';
import {StageQuery} from '../../../data/remote/rest-api/query/stage-query';
import {NgxGridComponent} from '../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {StageStandard} from '../../../data/remote/model/stage/stage-standard';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {EditStageStandardComponent} from '../component/edit-stage-standard/edit-stage-standard.component';

@Component({
  selector: 'app-stage-standard-dictionary',
  templateUrl: './stage-standard-dictionary.component.html',
  styleUrls: ['./stage-standard-dictionary.component.scss']
})
export class StageStandardDictionaryComponent extends BaseDictionaryComponent implements OnInit {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstant = PropertyConstant;

  public selectedSportType: SportType;
  public selectedStage: Stage;
  public stages: Stage[];
  public query: StageQuery;
  public canEdit: boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper, authorizationService);

    this.query = new StageQuery();
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.stages = await this.participantRestApiService.getStages();
  }

  //#region SportTypes

  loadSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  getName(obj: NamedObject) {
    return obj.name;
  }

  //#endregion

  public async onSportTypeChanged(val: any) {
    if (val) {
      this.query.sportTypeId = val.id;
    } else {
      delete this.query.sportTypeId;
    }

    await this.resetItems();
  }

  public async onStageChanged(val: any) {
    if (val) {
      this.query.stageId = val.id;
    } else {
      delete this.query.stageId;
    }

    await this.resetItems();
  }

  public fetchItems = async (pageQuery: StageQuery) => {
    if (!this.query.stageId || !this.query.sportTypeId) {
      return null;
    }
    return await this.participantRestApiService.getStageStandards(pageQuery);
  };

  public onAdd = async () => {
    await this.showModal(new StageStandard());
  };

  public onEdit = async (obj: StageStandard) => {
    await this.showModal(obj);
  };

  private async showModal(obj: StageStandard): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditStageStandardComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            await this.resetItems();
          }
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          if (await this._ngxModalService.remove(modal, component)) {
            await this.resetItems();
          }
        })
      ];
    });
  }

  private async resetItems(): Promise<void> {
    await this.appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
