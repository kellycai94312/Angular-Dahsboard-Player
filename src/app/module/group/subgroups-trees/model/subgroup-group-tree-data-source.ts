import {TreeDataSource} from './base/tree-data-source';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {DynamicFlatNode} from './dynamic-flat-node';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {SubgroupTemplateGroup} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {SubgroupGroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTemplateGroupVersion} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';

export class SubgroupGroupTreeDataSource extends TreeDataSource {

  constructor(public group: Group,
              public participantRestApiService: ParticipantRestApiService) {
    super();
  }

  public async initialize(): Promise<DynamicFlatNode[]> {
    return [new DynamicFlatNode(this.group, this.group.name, 0, true)];
  }

  public async getChildren(node: DynamicFlatNode): Promise<DynamicFlatNode[]> {
    // TODO: Checking is expandable on the server
    const nextLevel = (node.level || 0) + 1;
    if (node.data instanceof Group) {
      return (await this.participantRestApiService
        .getSubgroupTemplateGroupsByGroup({}, {count: PropertyConstant.pageSizeMax}, {groupId: this.group.id}))
        .list.map(x => new DynamicFlatNode(x, `${x.subgroupTemplateGroupVersion.template.name} [${x.subgroupTemplateGroupVersion.templateVersion.versionNumber}]`, nextLevel, true));
    } else if (node.data instanceof SubgroupTemplateGroup) {
      const subgroupTemplateGroupVersions = await this.participantRestApiService.getSubgroupTemplateGroupVersions({subgroupTemplateGroupId: node.data.id});
      return subgroupTemplateGroupVersions.map(x => new DynamicFlatNode(x, `Version ${x.templateVersion.versionNumber}. Approved '${x.applied}'`, nextLevel, true));
    } else if (node.data instanceof SubgroupTemplateGroupVersion) {
      const subgroupTemplateSubgroups = await this.participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {}, {subgroupTemplateGroupVersionId: node.data.id});
      return subgroupTemplateSubgroups.map(x => new DynamicFlatNode(x, x.subgroupVersion.name, nextLevel, true));
    } else if (node.data instanceof SubgroupGroup) {
      const subgroupTemplateSubgroups = await this.participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {subgroupGroupId: node.data.id}, {subgroupTemplateGroupVersionId: node.data.subgroupTemplateGroupVersion.id});
      return subgroupTemplateSubgroups.map(x => new DynamicFlatNode(x, x.subgroupVersion.name, nextLevel, true));
    }
  }

}
