import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../../data/remote/model/location';
import { AppHelper } from '../../../utils/app-helper';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { TrainingQuery } from '../../../data/remote/rest-api/query/training-query';
import { PropertyConstant } from '../../../data/local/property-constant';
import { PageQuery } from '../../../data/remote/rest-api/page-query';
import { DxTextBoxComponent } from 'devextreme-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../group.service';
import { TrainingGroup } from '../../../data/remote/model/training-group';
import { GroupEventModalComponent } from './group-event-modal/group-event-modal.component';
import { TrainingAccess } from '../../../data/remote/misc/training-access';

@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.scss']
})
export class GroupEventsComponent implements OnInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public pageSize: number;
  public trainingGroups: TrainingGroup[];

  readonly isEditAllow: boolean;
  private readonly _trainingQuery: TrainingQuery;
  private readonly _groupId: number;


  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _modalService: NgbModal) {
    this.pageSize = PropertyConstant.pageSize;
    this.isEditAllow = this._groupService.isEditAllow();
    this._groupId = this._groupService.getGroup().id;
    this._trainingQuery = new TrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = this.pageSize;
    this._trainingQuery.groupId = this._groupId;
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(value => {
        this._trainingQuery.name = value;
        this.updateListAsync();
      });
  }

  async onDateFromChange(event: any) {
    if (event.value) {
      this._trainingQuery.dateFrom = event.value.toISOString().split('T')[0];
    } else {
      delete this._trainingQuery.dateFrom;
    }
    await this.updateListAsync();
  }

  async onDateToChange(event: any) {
    if (event.value) {
      this._trainingQuery.dateTo = event.value.toISOString().split('T')[0];
    } else {
      delete this._trainingQuery.dateTo;
    }
    await this.updateListAsync();
  }

  async onLocationChange(e: any) {
    if (e.current) {
      this._trainingQuery.locationId = e.current.id;
    } else {
      delete this._trainingQuery.locationId;
    }
    await this.updateListAsync();
  }

  getKey(location: Location) {
    return location.id;
  }

  getName(location: Location) {
    return location.name;
  }

  loadLocations = async (from: number, searchText: string) => {
    return this._participantRestApiService.getLocations({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  async editAccess(item: TrainingGroup) {
    const ref = this._modalService.open(GroupEventModalComponent, {size: 'lg'});
    ref.componentInstance.trainingGroup = Object.assign({}, item);
    ref.componentInstance.onSave = async (access: TrainingAccess) => {
      await this._participantRestApiService.updateTrainingVisible({access: access}, {}, {
        groupId: this._groupId,
        trainingId: item.baseTraining.id
      });
      item.access = access;
      ref.dismiss();
    };
  }

  private async updateListAsync(from: number = 0) {
    this._trainingQuery.from = from;
    const container = await this._participantRestApiService.getGroupTrainings(this._trainingQuery);
    this.trainingGroups = AppHelper.pushItemsInList(from, this.trainingGroups, container);
  }

}
