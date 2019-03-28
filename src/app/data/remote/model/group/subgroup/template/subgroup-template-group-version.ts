import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupTemplateVersion} from './subgroup-template-version';
import {SubgroupTemplateGroup} from './subgroup-template-group';
import {SubgroupTemplate} from './subgroup-template';

export class SubgroupTemplateGroupVersion extends IdentifiedObject {
  public template: SubgroupTemplate;
  public templateVersion: SubgroupTemplateVersion;
  public subgroupTemplateGroup: SubgroupTemplateGroup;
  public adoptionDate: Date;
  /*шаблон применен администратором в группе*/
  public applied: boolean;
  /*когда администратор по истечении adoptionDate не подтвердил применение новой версии*/
  public disabled: boolean;
  public subgroupTemplateGroupId: number;
}
