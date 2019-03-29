import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {SubgroupTemplateVersion} from './subgroup-template-version';
import {Group} from '../../base/group';
import {SportType} from '../../../sport-type';
import {Type} from 'class-transformer';

export class SubgroupTemplate extends SubgroupPersonInterface {

  public name: string;
  public description?: string;

  @Type(type => SubgroupTemplateVersion)
  public templateVersion: SubgroupTemplateVersion;

  @Type(type => Group)
  public group: Group;

  @Type(type => SportType)
  public sportType: SportType;

}
