import {Component, ViewChild} from '@angular/core';
import {GroupClusterQuery} from '../../../../../../data/remote/rest-api/query/group/group-cluster-query';
import {PageContainer} from '../../../../../../data/remote/bean/page-container';
import {GroupCluster} from '../../../../../../data/remote/model/group/connection/group-cluster';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupService} from '../../../service/group.service';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {NgxButtonGroupComponent} from '../../../../../../components/ngx-button-group/ngx-button-group/ngx-button-group.component';
import {NgxGridComponent} from '../../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-clusters',
  templateUrl: './group-clusters.component.html',
  styleUrls: ['./group-clusters.component.scss']
})
export class GroupClustersComponent extends BaseGroupComponent<Group> {

  @ViewChild(NgxButtonGroupComponent)
  public ngxGridComponent: NgxGridComponent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _router: Router,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    await this.ngxGridComponent.reset();
  }

  public fetchItems = async (query: GroupClusterQuery): Promise<PageContainer<GroupCluster>> => {
    return this._participantRestApiService.getGroupClusters({}, {groupId: this.group.id}, query);
  };

  public onClickRow = async (obj: GroupCluster) => {
    await this._router.navigate([`${obj.id}`]);
  };

}
