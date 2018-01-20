import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GroupType } from '../../../../data/remote/model/group/base/group-type';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { DxTextBoxComponent } from 'devextreme-angular';
import 'rxjs/add/operator/debounceTime';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { AppHelper } from '../../../../utils/app-helper';
import { Group } from '../../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupTypes: GroupType[];
  public groups: Group[];

  private _searchText: string;
  private _selectedGroupType: GroupType;
  private readonly _groupQuery: GroupQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.groups = [];

    this._groupQuery = new GroupQuery();
    this._groupQuery.from = 0;
    this._groupQuery.count = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
  }

  public async onGroupTypeChanged(groupType: GroupType) {
    this._selectedGroupType = groupType;
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._groupQuery.from = from;
    this._groupQuery.name = this._searchText;

    if (this._selectedGroupType != null) {
      this._groupQuery.groupTypeId = this._selectedGroupType.id;
    } else {
      delete this._groupQuery.groupTypeId;
    }

    const pageContainer = await this._participantRestApiService.getGroups(this._groupQuery);
    this.groups = AppHelper.pushItemsInList(from, this.groups, pageContainer);
  }

}
