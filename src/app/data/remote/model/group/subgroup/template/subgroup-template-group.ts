import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {Group} from '../../base/group';
import {SubgroupTemplateGroupVersion} from './subgroup-template-group-version';

/*шаблон подгрупп, применненный к группе*/
export class SubgroupTemplateGroup extends SubgroupPersonInterface {
  /*группа, к которой применен шаблон*/
  public group: Group;
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;
  /*когда создатель шаблона удаляет его из примененной группы*/
  public deletedByTemplateOwner: boolean;
}
