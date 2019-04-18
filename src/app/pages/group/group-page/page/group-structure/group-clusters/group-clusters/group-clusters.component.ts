import {Component, OnInit} from '@angular/core';
import {GroupCluster} from '../../../../../../../data/remote/model/group/connection/group-cluster';
import {BaseGroupComponent} from '../../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../../service/group.service';
import {AppHelper} from '../../../../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../../../../data/local/property-constant';
import {GroupClusterRank} from '../../../../../../../data/remote/model/group/connection/group-cluster-rank';
import {TemplateModalService} from '../../../../../../../service/template-modal.service';
import {IdRequest} from '../../../../../../../data/remote/request/id-request';

@Component({
  selector: 'app-group-clusters',
  templateUrl: './group-clusters.component.html',
  styleUrls: ['./group-clusters.component.scss']
})
export class GroupClustersComponent extends BaseGroupComponent<Group> implements OnInit {

  public groupClusterMap = new Map<GroupCluster, Map<GroupClusterRank, Group[]>>();

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public async ngOnInit() {
    const groupClusters = (await this._participantRestApiService.getGroupClusters({}, {count: PropertyConstant.pageSizeMax}, {groupId: this.group.id})).list;
    for (const item of groupClusters) {
      this.groupClusterMap.set(item, new Map<GroupClusterRank, Group[]>());
    }
  }

  public async onEditGroupCluster(groupCluster: GroupCluster): Promise<void> {
    const dialogResult = await this._templateModalService.showEditGroupClusterModal(groupCluster);
    if (dialogResult.result) {
      Object.assign(groupCluster, dialogResult.data);
    }
  }

  public async onAddGroupClusterRank(groupCluster: GroupCluster) {
    await this.appHelper.tryAction('addedNewRank', 'error', async () => {
      const groupClusterRank = await this._participantRestApiService.createGroupClusterRank(new GroupClusterRank(groupCluster), {}, {groupClusterId: groupCluster.id});
      this.groupClusterMap.get(groupCluster).set(groupClusterRank, []);
    });
  }

  public getGroupClusters = (): any[] => {
    return Array.from(this.groupClusterMap.keys());
  };

  public getGroupClusterRanks = (groupCluster: GroupCluster): any[] => {
    return this.groupClusterMap.has(groupCluster) ? Array.from(this.groupClusterMap.get(groupCluster).keys()) : [];
  };

  public async onOpenedGroupCluster(groupCluster: GroupCluster): Promise<void> {
    const groupClusterRanks = (await this._participantRestApiService.getGroupClusterRanks({}, {count: PropertyConstant.pageSizeMax}, {groupClusterId: groupCluster.id})).list;
    const groupClusterRankMap = new Map<GroupClusterRank, Group[]>();

    for (const groupClusterRank of groupClusterRanks) {
      groupClusterRankMap.set(groupClusterRank, []);
    }

    this.groupClusterMap.set(groupCluster, groupClusterRankMap);
  }

  public async onClosedGroupCluster(groupCluster: GroupCluster): Promise<void> {
    this.groupClusterMap.set(groupCluster, new Map<GroupClusterRank, Group[]>());
  }

  public async onEditGroupClusterRank(groupCluster: GroupCluster, groupClusterRank: GroupClusterRank) {
    const groups = await this._participantRestApiService.getRankConnections({}, {unassigned: false}, {groupClusterRankId: groupClusterRank.id});
    const dialogResult = await this._templateModalService.showSelectionUnassignedGroupsForGroupClusterRankModal(groupClusterRank, groups);
    if (dialogResult.result) {
      await this._participantRestApiService.updateRankConnections({list: dialogResult.data.map(x => new IdRequest(x.id))}, {}, {groupClusterRankId: groupClusterRank.id});
      this.groupClusterMap.get(groupCluster).set(groupClusterRank, dialogResult.data);
    }
  }

  public async onRemoveGroupClusterRank(groupCluster: GroupCluster, groupClusterRank: GroupClusterRank) {
    await this.appHelper.tryRemove(async () => {
      await this._participantRestApiService.removeGroupClusterRank({groupClusterId: groupClusterRank.cluster.id, groupClusterRankId: groupClusterRank.id});
      this.groupClusterMap.get(groupCluster).delete(groupClusterRank);
    });
  }

  public async onOpenedGroupClusterRank(groupCluster: GroupCluster, groupClusterRank: GroupClusterRank) {
    const groups = await this._participantRestApiService.getRankConnections({}, {unassigned: false}, {groupClusterRankId: groupClusterRank.id});
    this.groupClusterMap.get(groupCluster).set(groupClusterRank, groups);
  }

  public async onClosedGroupClusterRank(groupCluster: GroupCluster, groupClusterRank: GroupClusterRank): Promise<void> {
    this.groupClusterMap.get(groupCluster).set(groupClusterRank, []);
  }

}
