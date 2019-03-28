import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {BaseSubgroupVersion} from '../version/base-subgroup-version';
import {SubgroupGroupItem} from './subgroup-group-item';
import {SubgroupTemplateGroupVersion} from '../template/subgroup-template-group-version';

/*подгруппа шаблона подгрупп, примененного к группе*/
export class SubgroupGroup extends SubgroupPersonInterface {
  /*версия подгруппы из шаблона подгрупп или созданная вне шаблона*/
  public subgroupVersion: BaseSubgroupVersion;
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;
  public subgroupGroupItem: SubgroupGroupItem;
  // Transient
  public participantsAmount?: number;
}
