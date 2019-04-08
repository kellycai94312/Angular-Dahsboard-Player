import {SubgroupTemplateGroup} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {SubgroupTemplateGroupVersion} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';
import {SubgroupGroup} from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';

export class RootSubgroupGroup {
  constructor(public subgroupTemplateGroup: SubgroupTemplateGroup,
              public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion,
              public defaultSubgroupGroup: SubgroupGroup) {
  }
}
