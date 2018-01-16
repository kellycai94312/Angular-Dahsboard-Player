import {Component, OnInit} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Group} from '../../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {

  public search: string;

  public groupTypes: GroupType[];
  public selectedGroupTypes: GroupType;

  public groups: Group[];

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.groups = [];
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();

    let group
  }

  public onRowUpdating(e) {
    console.log(e);
  }

}
