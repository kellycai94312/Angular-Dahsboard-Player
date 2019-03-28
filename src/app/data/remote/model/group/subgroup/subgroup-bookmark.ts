import {NamedObject} from '../../../base/named-object';
import {BaseSubgroupVersion} from './version/base-subgroup-version';
import {SubgroupTemplateGroupVersion} from './template/subgroup-template-group-version';

export class SubgroupBookmark extends NamedObject {
  public subgroupVersion: BaseSubgroupVersion;
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;
}
