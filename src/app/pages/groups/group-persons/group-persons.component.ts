import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPersonQuery} from '../../../data/remote/rest-api/query/group-person-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import {GroupPersonViewModel} from '../../../data/local/view-model/group-person-view-model';
import {GroupService} from '../group.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupPersonModalComponent} from '../group-person-modal/group-person-modal.component';

@Component({
  selector: 'app-group-persons',
  templateUrl: './group-persons.component.html',
  styleUrls: ['./group-persons.component.scss']
})
export class GroupPersonsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  public dataSource: any;

  private _groupPersonQuery: GroupPersonQuery;
  private _searchText: string;

  constructor(private _modalService: NgbModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              public groupService: GroupService) {
    this._activatedRoute.params.subscribe(async params => {
      this._searchText = '';

      const groupId = this._activatedRoute.parent.snapshot.params.id;
      const subGroupId: number = +params.id;

      this._groupPersonQuery = new GroupPersonQuery();
      this._groupPersonQuery.from = 0;
      this._groupPersonQuery.count = PropertyConstant.pageSize;
      this._groupPersonQuery.id = groupId;
      if (subGroupId !== 0) {
        this._groupPersonQuery.subGroupId = subGroupId;
      }
      this.initCustomStore();
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(value => {
        this._searchText = value;
        this.initCustomStore();
      });
  }

  private initCustomStore() {
    this.dataSource = {};
    this.dataSource.store = new CustomStore({
      load: this.loadData
    });
  }

  loadData = async (loadOptions: any): Promise<any> => {
    this._groupPersonQuery.from = loadOptions.skip;
    this._groupPersonQuery.fullName = this._searchText;

    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(this._groupPersonQuery);
    const data: GroupPersonViewModel[] = [];
    for (let i = 0; i < pageContainer.list.length; i++) {
      const groupPersonViewModel = new GroupPersonViewModel(pageContainer.list[i], this._participantRestApiService);
      await groupPersonViewModel.init();
      data.push(groupPersonViewModel);
    }

    return {
      data: data,
      totalCount: pageContainer.total
    };
  };

  public onEdit(groupPersonViewModel: GroupPersonViewModel) {
    const modalRef = this._modalService.open(GroupPersonModalComponent, {size: 'lg'});
    modalRef.componentInstance.groupPerson = groupPersonViewModel.groupPerson;
  }

}
