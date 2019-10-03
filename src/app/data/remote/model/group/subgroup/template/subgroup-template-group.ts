import { Type } from 'class-transformer';
import { Group, GROUP_TYPE_OPTIONS } from '../../base';
import { SubgroupPersonInterface } from '../person/subgroup-person-interface';
import { SubgroupTemplateGroupVersion } from './subgroup-template-group-version';

/*шаблон подгрупп, применненный к группе*/
export class SubgroupTemplateGroup extends SubgroupPersonInterface {

  /*группа, к которой применен шаблон*/
  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  @Type(() => SubgroupTemplateGroupVersion)
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

  /*когда создатель шаблона удаляет его из примененной группы*/
  public deletedByTemplateOwner: boolean;

}
