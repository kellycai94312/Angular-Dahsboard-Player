import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TrainingQuery} from '../../../../data/remote/rest-api/query/training-query';
import {PersonService} from '../person.service';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import {TrainingPerson} from '../../../../data/remote/model/training/training-person';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventModalComponent} from './event-modal/event-modal.component';
import {ReportsService} from '../../../../shared/reports.service';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {ISubscription} from 'rxjs/Subscription';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  public readonly pageSize: number;
  public allowEdit: boolean;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public trainingQuery: TrainingQuery;

  private readonly userRoleSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _reportsService: ReportsService,
              private _personService: PersonService,
              private _appHelper: AppHelper,
              private _modalService: NgbModal) {
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
      await this.updateItems();
    });
  }

  async ngOnInit() {
    this.allowEdit = await this._personService.allowEdit();

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.trainingQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
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
    await this.updateItems();
  }

  public async onDateToChange(event: any) {
    if (event.value) {
      this.trainingQuery.dateTo = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.trainingQuery.dateTo;
    }
    await this.updateItems();
  }

  public async onLocationChange(e: any) {
    if (e.current) {
      this.trainingQuery.locationId = e.current.id;
    } else {
      delete this.trainingQuery.locationId;
    }
    await this.updateItems();
  }

  //#endregion

  public async editPublic(item: TrainingPerson) {
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
  }

  public async downloadReport(item: TrainingPerson) {
    if (item.baseTraining.discriminator === TrainingDiscriminator.GAME) {
      await this._reportsService.downloadGameReport(item.baseTraining.id, item.trainingGroup.id);
    } else {
      await this._reportsService.downloadPersonalReport(item.baseTraining.id, item.id);
    }
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getPersonTrainings(pageQuery);
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
