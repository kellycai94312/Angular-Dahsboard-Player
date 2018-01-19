import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GroupType } from '../../../../data/remote/model/group/base/group-type';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import 'rxjs/add/operator/toPromise';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { DxTextBoxComponent } from 'devextreme-angular';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

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
  private currentPosition: number;

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
        await this.updateListAsync(0);
      });
  }

  public async updateListAsync(from: number) {
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
    if (pageContainer != null) {
      if (from <= 0) {
        this.groups = pageContainer.list;
      } else {
        this.groups.push(pageContainer.list);
      }
      this.currentPosition = from + pageSize;
    }
  }

  public async onGroupTypeChanged(groupType: GroupType) {
    await this.updateListAsync(0);
  }

  public async onScrollDown() {
    console.log('onScrollDown');
    this.currentPosition += 15;
    await this.updateListAsync(this.currentPosition);
  }

}
