import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {BaseSubgroupVersion} from '../version/base-subgroup-version';
import {SubgroupGroupItem} from './subgroup-group-item';
import {SubgroupTemplateGroupVersion} from '../template/subgroup-template-group-version';
import {Type} from 'class-transformer';

/*подгруппа шаблона подгрупп, примененного к группе*/
export class SubgroupGroup extends SubgroupPersonInterface {

  /*версия подгруппы из шаблона подгрупп или созданная вне шаблона*/
  @Type(type => BaseSubgroupVersion)
  public subgroupVersion: BaseSubgroupVersion;

  @Type(type => SubgroupTemplateGroupVersion)
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

  @Type(type => SubgroupGroupItem)
  public subgroupGroupItem: SubgroupGroupItem;

  // КОСГУ
  public kosgu?: string;

  // Transient
  public participantsAmount?: number;

}
