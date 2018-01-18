import {Component, OnInit} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {

  public searchText: string;

  public groupTypes: GroupType[];
  public selectedGroupTypes: GroupType;

  public groups: any[];

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.groups = [];
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.groups = await this._participantRestApiService.getGroupTypes();
  }

  public onSearchChanged(search: string) {
    console.log(search);
  }

  public onGroupTypeChanged(groupType: GroupType) {
    console.log(groupType);
  }

}
