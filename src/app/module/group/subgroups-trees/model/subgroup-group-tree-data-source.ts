import {TreeDataSource} from './base/tree-data-source';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {DynamicFlatNode} from './dynamic-flat-node';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {SubgroupTemplateGroup} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {SubgroupGroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';

export class SubgroupGroupTreeDataSource extends TreeDataSource {

  constructor(public group: Group,
              public participantRestApiService: ParticipantRestApiService) {
    super();
  }

  public async initialize(): Promise<DynamicFlatNode[]> {
    return (await this.participantRestApiService
      .getSubgroupTemplateGroupsByGroup({}, {count: PropertyConstant.pageSizeMax}, {groupId: this.group.id}))
      .list.map(x => new DynamicFlatNode(x, `${x.template.name} [${x.templateVersion.versionNumber}]`, 0, true));
  }

  public async getChildren(node: DynamicFlatNode): Promise<DynamicFlatNode[]> {
    // TODO: Checking is expandable on the server
    const nextLevel = (node.level || 0) + 1;
    if (!node.level) {
      const nodeData = node.data as SubgroupTemplateGroup;

      const subgroupGroups = await this.participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {}, {subgroupTemplateGroupId: nodeData.id});
      return subgroupGroups.map(x => new DynamicFlatNode(x, x.subgroupVersion.name, nextLevel, true));
    } else {
      const nodeData = node.data as SubgroupGroup;

      const subgroupTemplateSubgroups = await this.participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {subgroupGroupId: nodeData.id}, {subgroupTemplateGroupId: nodeData.subgroupTemplateGroup.id});
      return subgroupTemplateSubgroups.map(x => new DynamicFlatNode(x, x.subgroupVersion.name, nextLevel, true));
    }
  }

}
