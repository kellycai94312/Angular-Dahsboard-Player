import {Component, OnInit} from '@angular/core';
import {PropertyConstant} from '../../../../../../../data/local/property-constant';
import {ParticipantRestApiService} from '../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupCluster} from '../../../../../../../data/remote/model/group/connection/group-cluster';
import {BaseGroupComponent} from '../../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../../service/group.service';
import {AppHelper} from '../../../../../../../utils/app-helper';

@Component({
  selector: 'app-groups-hierarchies',
  templateUrl: './groups-hierarchies.component.html',
  styleUrls: ['./groups-hierarchies.component.scss']
})
export class GroupsHierarchiesComponent extends BaseGroupComponent<Group> implements OnInit {

  public selectedGroupCluster: GroupCluster;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    super.ngOnInit();
    // TODO: Use normal first select
    const clusters = await this.fetchClusters(0, '');
    if (clusters.list.length) {
      this.selectedGroupCluster = clusters.list[0];
    }
  }

  public fetchClusters = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getGroupClusters({}, {from: from, count: PropertyConstant.pageSize, name: searchText}, {groupId: this.group.id});
  };

  public getKey(item: GroupCluster) {
    return item.id;
  }

  public getName(item: GroupCluster) {
    return item.name;
  }

}
