import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {SubgroupVersion} from '../version/subgroup-version';
import {SubgroupTemplateVersion} from '../template/subgroup-template-version';

/*подгруппа шаблона подгрупп*/
export class Subgroup extends SubgroupPersonInterface {
  public subgroupVersion: SubgroupVersion;
  public templateVersion: SubgroupTemplateVersion;
}
