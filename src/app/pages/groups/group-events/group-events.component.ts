import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {TrainingQuery} from '../../../data/remote/rest-api/query/training-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../group.service';
import {TrainingGroup} from '../../../data/remote/model/training-group';
import {GroupEventModalComponent} from './group-event-modal/group-event-modal.component';
import {TrainingAccess} from '../../../data/remote/misc/training-access';
import {InfiniteListComponent} from '../../../components/infinite-list/infinite-list.component';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.scss']
})
export class GroupEventsComponent implements OnInit, AfterViewInit, OnDestroy {

  public readonly isEditAllow: boolean;
  public readonly pageSize: number;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(InfiniteListComponent)
  public infiniteListComponent: InfiniteListComponent;

  public trainingQuery: TrainingQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _modalService: NgbModal) {
    this.pageSize = PropertyConstant.pageSize;
    this.isEditAllow = this._groupService.isEditAllow();

    this.trainingQuery = new TrainingQuery();
    this.trainingQuery.name = '';
    this.trainingQuery.from = 0;
    this.trainingQuery.count = this.pageSize;
    this.trainingQuery.groupId = this._groupService.getGroup().id;
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.trainingQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  //#region Filter

  async onDateFromChange(event: any) {
    if (event.value) {
      this.trainingQuery.dateFrom = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.trainingQuery.dateFrom;
    }
    await this.updateItems();
  }

  async onDateToChange(event: any) {
    if (event.value) {
      this.trainingQuery.dateTo = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.trainingQuery.dateTo;
    }
    await this.updateItems();
  }

  async onLocationChange(e: any) {
    if (e.current) {
      this.trainingQuery.locationId = e.current.id;
    } else {
      delete this.trainingQuery.locationId;
    }
    await this.updateItems();
  }

  //#endregion

  async editAccess(item: TrainingGroup) {
    const ref = this._modalService.open(GroupEventModalComponent, {size: 'lg'});
    ref.componentInstance.trainingGroup = Object.assign({}, item);
    ref.componentInstance.onSave = async (access: TrainingAccess) => {
      await this._participantRestApiService.updateTrainingVisible({access: access}, {}, {
        groupId: this.trainingQuery.groupId,
        trainingId: item.baseTraining.id
      });
      item.access = access;
      ref.dismiss();
    };
  }

  public getItems: Function = async (pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupTrainings(pageQuery);
  };

  private async updateItems() {
    await this.infiniteListComponent.update(true);
  }

}
