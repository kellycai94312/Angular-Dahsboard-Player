import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {SubgroupTemplateVersion} from './subgroup-template-version';
import {Group} from '../../base/group';

/*шаблон подгрупп, применненный к группе*/
export class SubgroupTemplateGroup extends SubgroupPersonInterface {
  public templateVersion: SubgroupTemplateVersion;
  /*группа, к которой применен шаблон*/
  public group: Group;
  /*крайняя дата одобрения версии шаблона*/
  public adoptionDate: Date;
  /*шаблон применен администратором в группе*/
  public applied: boolean;
  /*когда администратор по истечении adoptionDate не подтвердил применение новой версии*/
  public disabled: boolean;
  /*когда создатель шаблона удаляет его из примененной группы*/
  public deletedByTemplateOwner: boolean;
}
