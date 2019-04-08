import {SubgroupTemplate} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateVersion} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-version';
import {Subgroup} from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup';

export class RootSubgroup {
  constructor(public subgroupTemplate: SubgroupTemplate,
              public subgroupTemplateVersion: SubgroupTemplateVersion,
              public defaultSubgroup: Subgroup) {
  }
}
