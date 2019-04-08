import {NamedObject} from '../../../base/named-object';
import {BaseSubgroupVersion} from './version/base-subgroup-version';
import {SubgroupTemplateGroupVersion} from './template/subgroup-template-group-version';
import {Type} from 'class-transformer';

export class SubgroupBookmark extends NamedObject {

  @Type(type => BaseSubgroupVersion)
  public subgroupVersion: BaseSubgroupVersion;

  @Type(type => SubgroupTemplateGroupVersion)
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

}
