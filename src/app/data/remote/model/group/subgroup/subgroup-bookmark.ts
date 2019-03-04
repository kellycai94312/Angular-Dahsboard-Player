import {NamedObject} from '../../../base/named-object';
import {BaseSubgroupVersion} from './version/base-subgroup-version';
import {SubgroupTemplateGroup} from './template/subgroup-template-group';

export class SubgroupBookmark extends NamedObject {
  public subgroupVersion: BaseSubgroupVersion;
  public subgroupTemplateGroup: SubgroupTemplateGroup;
}
