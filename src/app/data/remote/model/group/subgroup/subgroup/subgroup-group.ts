import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {BaseSubgroupVersion} from '../version/base-subgroup-version';
import {SubgroupTemplateGroup} from '../template/subgroup-template-group';

/*подгруппа шаблона подгрупп, примененного к группе*/
export class SubgroupGroup extends SubgroupPersonInterface {
  /*версия подгруппы из шаблона подгрупп или созданная вне шаблона*/
  public subgroupVersion: BaseSubgroupVersion;
  public subgroupTemplateGroup: SubgroupTemplateGroup;
}
