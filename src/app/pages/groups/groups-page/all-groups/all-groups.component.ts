import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GroupType } from '../../../../data/remote/model/group/base/group-type';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { DxTextBoxComponent } from 'devextreme-angular';
import 'rxjs/add/operator/debounceTime';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { AppHelper } from '../../../../utils/app-helper';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupTypes: GroupType[];
  public selectedGroupType: GroupType;

  public groups: any[];

  private _searchText: string;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.groups = [];
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

  public async updateListAsync(from: number = 0) {
    const pageSize = PropertyConstant.pageSize;
    const groupQuery = new GroupQuery();
    groupQuery.from = from;
    groupQuery.count = pageSize;

    if (this._searchText != null) {
      groupQuery.name = this._searchText;
    }
    if (this.selectedGroupType != null) {
      groupQuery.groupTypeId = this.selectedGroupType.id;
    }

    const pageContainer = await this._participantRestApiService.getGroups(groupQuery);
    this.groups = AppHelper.pushItemsInList(from, this.groups, pageContainer);
  }

  public async onGroupTypeChanged(groupType: GroupType) {
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

}
