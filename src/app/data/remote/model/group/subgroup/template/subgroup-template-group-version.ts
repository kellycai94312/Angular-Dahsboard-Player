import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupTemplateVersion} from './subgroup-template-version';
import {SubgroupTemplate} from './subgroup-template';
import {Type} from 'class-transformer';

export class SubgroupTemplateGroupVersion extends IdentifiedObject {

  @Type(type => SubgroupTemplateVersion)
  public templateVersion: SubgroupTemplateVersion;

  /*крайняя дата одобрения версии шаблона*/
  public adoptionDate: Date;

  /*шаблон применен администратором в группе*/
  public applied: boolean;

  /*когда администратор по истечении adoptionDate не подтвердил применение новой версии*/
  public disabled: boolean;

  @Type(type => SubgroupTemplate)
  public template: SubgroupTemplate;

  public subgroupTemplateGroupId: number;

}
