import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../group.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupPersonQuery} from '../../../../data/remote/rest-api/query/group-person-query';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  public groupPersons: GroupPerson[];

  private _searchText: string;
  private readonly _groupPersonQuery: GroupPersonQuery;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService) {
    this.groupPersons = [];
    this._searchText = '';

    this._groupPersonQuery = new GroupQuery();
    this._groupPersonQuery.from = 0;
    this._groupPersonQuery.count = PropertyConstant.pageSize;
    this._groupPersonQuery.id = this._groupService.getGroup().id;
    this._groupPersonQuery.approved = false;
  }

  async ngOnInit() {
    await this.updateListAsync();
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

  public async onAdd(groupPerson: GroupPerson) {
    await this._participantRestApiService.putApprovePersonInGroup({id: this._groupService.getGroup().id, personId: groupPerson.person.id});
    AppHelper.removeItem(this.groupPersons, groupPerson);
  }

  public async onRemove(groupPerson: GroupPerson) {
    await this._participantRestApiService.deleteApprovePersonInGroup({
      id: this._groupService.getGroup().id,
      personId: groupPerson.person.id
    });
    AppHelper.removeItem(this.groupPersons, groupPerson);
  }
}
