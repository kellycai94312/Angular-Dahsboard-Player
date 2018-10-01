import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TrainingQuery} from '../../../../data/remote/rest-api/query/training-query';
import {PersonService} from '../person.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {TrainingPerson} from '../../../../data/remote/model/training/training-person';
import {ReportsService} from '../../../../shared/reports.service';
import {ISubscription} from 'rxjs/Subscription';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {ReportsComponent} from '../../../../components/report/reports/reports.component';
import {EventModalComponent} from './event-modal/event-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  public readonly propertyConstant = PropertyConstant;
  public readonly pageSize: number;
  public canEdit: boolean;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public trainingQuery: TrainingQuery;

  private readonly userRoleSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _reportsService: ReportsService,
              private _personService: PersonService,
              private _appHelper: AppHelper,
              private _modalService: NgbModal,
              private _ngxModalService: NgxModalService) {
    this.pageSize = PropertyConstant.pageSize;
    this.trainingQuery = new TrainingQuery();
    this.trainingQuery.from = 0;
    this.trainingQuery.count = this.pageSize;
    this.trainingQuery.personId = this._personService.personViewModel.data.id;

    if (this._personService.selectedUserRole) {
      this.trainingQuery.userRoleEnum = this._personService.selectedUserRole.userRoleEnum;
    }

    this.userRoleSubscription = this._personService.userRoleHandler.subscribe(async x => {
      if (x) {
        this.trainingQuery.userRoleEnum = x.userRoleEnum;
      } else {
        delete this.trainingQuery.userRoleEnum;
      }
      await this.resetItems();
    });
  }

  async ngOnInit() {
    this.canEdit = await this._personService.allowEdit();

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.trainingQuery.name = value;
        await this.resetItems();
      });
    await this.resetItems();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this.searchDxTextBoxComponent.textChange);
    this._appHelper.unsubscribe(this.userRoleSubscription);
  }

  //#region Filter

  public async onDateFromChange(event: any) {
    if (event.value) {
      this.trainingQuery.dateFrom = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.trainingQuery.dateFrom;
    }
    await this.resetItems();
  }

  public async onDateToChange(event: any) {
    if (event.value) {
      this.trainingQuery.dateTo = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.trainingQuery.dateTo;
    }
    await this.resetItems();
  }

  public async onLocationChange(e: any) {
    if (e.current) {
      this.trainingQuery.locationId = e.current.id;
    } else {
      delete this.trainingQuery.locationId;
    }
    await this.resetItems();
  }

  //#endregion

  public onEdit = async (item: TrainingPerson) => {
    const ref = this._modalService.open(EventModalComponent, {size: 'lg'});
    ref.componentInstance.trainingPerson = Object.assign({}, item);
    ref.componentInstance.onSave = async (visible: boolean) => {
      if (visible) {
        await this._participantRestApiService.addTrainingVisible({trainingId: item.baseTraining.id});
      } else {
        await this._participantRestApiService.removeTrainingVisible({trainingId: item.baseTraining.id});
      }
      item.visible = visible;
      ref.dismiss();
    };
  };

  public onGetReport = async (e: any, parameter: TrainingPerson) => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'report';
    await modal.componentInstance.initializeBody(ReportsComponent, async component => {
      component.initialize(parameter);
    });
  };

  public fetchItems: Function = async (query: TrainingQuery) => {
    return await this._participantRestApiService.getPersonTrainings(query);
  };

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
