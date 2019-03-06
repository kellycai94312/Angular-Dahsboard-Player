import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {SubgroupTemplateVersion} from './subgroup-template-version';
import {Group} from '../../base/group';
import {SportType} from '../../../sport-type';

export class SubgroupTemplate extends SubgroupPersonInterface {
  public name: string;
  public description?: string;
  public templateVersion: SubgroupTemplateVersion;
  public group: Group;
  public sportType: SportType;
}
