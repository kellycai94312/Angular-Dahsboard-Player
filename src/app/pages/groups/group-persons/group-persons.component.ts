import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { GroupPerson } from '../../../data/remote/model/group/group-person';
import { PageQuery } from '../../../data/remote/rest-api/page-query';
import { AppHelper } from '../../../utils/app-helper';
import { GroupPersonQuery } from '../../../data/remote/rest-api/query/group-person-query';
import { PropertyConstant } from '../../../data/local/property-constant';
import { DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-group-persons',
  templateUrl: './group-persons.component.html',
  styleUrls: ['./group-persons.component.scss']
})
export class GroupPersonsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupPersons: GroupPerson[];

  private _groupPersonQuery: GroupPersonQuery;
  private _searchText: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute) {
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

      await this.updateListAsync();
    });
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
