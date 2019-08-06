import {SubgroupGroup} from '../model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTemplateGroupVersionPosition} from './subgroup-template-group-version-position';
import {Type} from 'class-transformer';

export class SubgroupTemplateGroupVersionPersonPosition {

  @Type(() => SubgroupGroup)
  public subgroups: SubgroupGroup[];

  @Type(() => SubgroupTemplateGroupVersionPosition)
  public positions: SubgroupTemplateGroupVersionPosition[];

}
