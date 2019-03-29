import {TreeDataSource} from './base/tree-data-source';
import {DynamicFlatNode} from './dynamic-flat-node';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {SubgroupTemplate} from '../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateVersion} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-version';
import {Subgroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup';

export class SubgroupTemplateTreeDataSource extends TreeDataSource {

  constructor(public group: Group,
              public participantRestApiService: ParticipantRestApiService) {
    super();
  }

  public async initialize(): Promise<DynamicFlatNode[]> {
    return (await this.participantRestApiService
      .getSubgroupTemplates({}, {count: PropertyConstant.pageSizeMax}, {groupId: this.group.id}))
      .list.map(x => new DynamicFlatNode(x, x.name, 0, true));
  }

  public async getChildren(node: DynamicFlatNode): Promise<DynamicFlatNode[]> {
    // TODO: Checking is expandable on the server
    const nextLevel = (node.level || 0) + 1;
    if (node.data instanceof SubgroupTemplate) {
      const subgroupTemplateVersions = await this.participantRestApiService.getSubgroupTemplateVersions({subgroupTemplateId: node.data.id});
      return subgroupTemplateVersions.map(x => new DynamicFlatNode(x, `Version ${x.versionNumber}. Approved '${x.approved}'`, nextLevel, true));
    } else if (node.data instanceof SubgroupTemplateVersion) {
      const subgroupTemplateSubgroups = await this.participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {}, {subgroupTemplateVersionId: node.data.id});
      return subgroupTemplateSubgroups.map(x => new DynamicFlatNode(x, x.subgroupVersion.name, nextLevel, true));
    } else if (node.data instanceof Subgroup) {
      const subgroupTemplateSubgroups = await this.participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {subgroupId: node.data.id}, {subgroupTemplateVersionId: node.data.templateVersion.id});
      return subgroupTemplateSubgroups.map(x => new DynamicFlatNode(x, x.subgroupVersion.name, nextLevel, true));
    }
  }

}
