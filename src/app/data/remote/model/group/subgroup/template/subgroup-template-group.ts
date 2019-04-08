import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {Group} from '../../base/group';
import {SubgroupTemplateGroupVersion} from './subgroup-template-group-version';
import {Type} from 'class-transformer';

/*шаблон подгрупп, применненный к группе*/
export class SubgroupTemplateGroup extends SubgroupPersonInterface {

  /*группа, к которой применен шаблон*/
  @Type(type => Group)
  public group: Group;

  @Type(type => SubgroupTemplateGroupVersion)
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

  /*когда создатель шаблона удаляет его из примененной группы*/
  public deletedByTemplateOwner: boolean;

}
