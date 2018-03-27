import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupPersonQuery} from '../../../../data/remote/rest-api/query/group-person-query';
import {GroupService} from '../../group.service';
import {GroupPersonViewModel} from '../../../../data/local/view-model/group-person-view-model';
import {GroupPersonModalComponent} from '../../group-person-modal/group-person-modal.component';
import CustomStore from 'devextreme/data/custom_store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  public dataSource: any;

  private _searchText: string;
  private readonly _groupPersonQuery: GroupPersonQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              public groupService: GroupService) {
    this._searchText = '';

    this._groupPersonQuery = new GroupPersonQuery();
    this._groupPersonQuery.from = 0;
    this._groupPersonQuery.count = PropertyConstant.pageSize;
    this._groupPersonQuery.id = this.groupService.getGroup().id;
    this._groupPersonQuery.approved = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
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
    modalRef.componentInstance.onChange = async () => this.initCustomStore();
  }

}
