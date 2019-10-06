import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base';
import { Document } from '../../file/document/document';
import { Group, GROUP_TYPE_OPTIONS } from '../base';
import { PersonTransitionType } from './person-transition-type';

export class GroupTransition extends IdentifiedObject {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public groupJoin: Group;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public groupLeave: Group;

  public type: PersonTransitionType;

  //region Transient

  @Type(() => Document)
  public documents: Document[];

  //endregion

}
