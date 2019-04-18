import {Component} from '@angular/core';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {GroupConnectionTypeEnum} from '../../../../data/remote/model/group/connection/group-connection-type-enum';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupConnectionRequest} from '../../../../data/remote/model/group/connection/group-connection-request';
import {Group} from '../../../../data/remote/model/group/base/group';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {GroupCluster} from '../../../../data/remote/model/group/connection/group-cluster';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupClusterQuery} from '../../../../data/remote/rest-api/query/group/group-cluster-query';

@Component({
  selector: 'app-edit-group-connection-request',
  templateUrl: './edit-group-connection-request.component.html',
  styleUrls: ['./edit-group-connection-request.component.scss']
})
export class EditGroupConnectionRequestComponent extends BaseEditComponent<GroupConnectionRequest> {

  public groupConnectionTypes: NameWrapper<GroupConnectionTypeEnum>[];
  public selectedGroupConnectionType: NameWrapper<GroupConnectionTypeEnum>;
  public group: Group;
  public groupCluster: GroupCluster;
  public groupLink: Group;
  public groupClusterLink: GroupCluster;

  constructor(private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: GroupConnectionRequest): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.groupConnectionTypes = await this._translateObjectService.getTranslatedEnumCollection<GroupConnectionTypeEnum>(GroupConnectionTypeEnum, 'GroupConnectionTypeEnum');

        if (this.isNew) {
          this.selectedGroupConnectionType = this.groupConnectionTypes[0];
          this.data.groupConnectionTypeEnum = this.selectedGroupConnectionType.data;
        } else {
          this.selectedGroupConnectionType = this.groupConnectionTypes.find(x => x.data === data.groupConnectionTypeEnum);

          if (this.data.groupConnectionTypeEnum === GroupConnectionTypeEnum.REQUEST) {
            this.group = this.data.parentGroup;
            this.groupCluster = this.data.cluster;
            this.groupLink = this.data.group;
            this.groupClusterLink = this.data.dependantGroupsCluster;
          } else {
            this.group = this.data.group;
            this.groupCluster = this.data.dependantGroupsCluster;
            this.groupLink = this.data.parentGroup;
            this.groupClusterLink = this.data.cluster;
          }
        }
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeGroupConnectionRequest({groupConnectionRequestId: this.data.id});
    });
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.data.groupConnectionTypeEnum === GroupConnectionTypeEnum.REQUEST) {
        this.data.parentGroup = this.group;
        this.data.cluster = this.groupCluster;
        this.data.group = this.groupLink;
        this.data.dependantGroupsCluster = this.groupClusterLink;
      } else {
        this.data.group = this.group;
        this.data.dependantGroupsCluster = this.groupCluster;
        this.data.parentGroup = this.groupLink;
        this.data.cluster = this.groupClusterLink;
      }

      if (this.isNew) {
        this.data = await this.participantRestApiService.createGroupConnectionRequest(this.data);
      } else {
        this.data = await this.participantRestApiService.updateGroupConnectionRequest(this.data, {}, {groupConnectionRequestId: this.data.id});
      }
    });
  }

  public onSelectedGroupConnectionType(value: NameWrapper<GroupConnectionTypeEnum>) {
    this.data.groupConnectionTypeEnum = value.data;
  }

  public fetchGroups = async (from: number, searchText: string) => {
    return await this.participantRestApiService.getGroups({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  public fetchGroupClusters = async (from: number, searchText: string) => {
    return await this.participantRestApiService.getGroupClusters({},
      {from: from, count: PropertyConstant.pageSize, name: searchText},
      {groupId: this.group.id});
  };

  public fetchLinkGroups = async (from: number, searchText: string) => {
    const query: GroupClusterQuery = {from: from, count: PropertyConstant.pageSize, name: searchText};
    if (this.groupCluster) {
      query.clusterId = this.groupCluster.id;
    }
    return await this.participantRestApiService.getUnassignedClusterGroups({}, query, {groupId: this.group.id});
  };

  public fetchLinkGroupClusters = async (from: number, searchText: string) => {
    return await this.participantRestApiService.getGroupClusters({},
      {from: from, count: PropertyConstant.pageSize, name: searchText, dependantGroupId: this.group.id},
      {groupId: this.groupLink.id});
  };

  public getKey(item: IdentifiedObject) {
    return item.id;
  }

  public getName(item: Group | GroupCluster) {
    return item.name;
  }

}
