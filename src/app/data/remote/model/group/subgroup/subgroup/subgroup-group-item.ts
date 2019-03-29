import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupTemplateGroup} from '../template/subgroup-template-group';
import {Type} from 'class-transformer';

export class SubgroupGroupItem extends IdentifiedObject {

  @Type(type => SubgroupTemplateGroup)
  public subgroupTemplateGroup: SubgroupTemplateGroup;

}
