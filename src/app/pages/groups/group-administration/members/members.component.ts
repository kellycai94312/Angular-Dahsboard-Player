import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupPersonQuery} from '../../../../data/remote/rest-api/query/group-person-query';
import {GroupService} from '../../group.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupPersons: GroupPerson[];

  private _searchText: string;
  private readonly _groupPersonQuery: GroupPersonQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService) {
    this.groupPersons = [];
    this._searchText = '';

    this._groupPersonQuery = new GroupPersonQuery();
    this._groupPersonQuery.from = 0;
    this._groupPersonQuery.count = PropertyConstant.pageSize;
    this._groupPersonQuery.id = this._groupService.getGroup().id;
    this._groupPersonQuery.approved = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._groupPersonQuery.from = from;
    this._groupPersonQuery.fullName = this._searchText;

    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(this._groupPersonQuery);
    this.groupPersons = AppHelper.pushItemsInList(from, this.groupPersons, pageContainer);
  }

}
