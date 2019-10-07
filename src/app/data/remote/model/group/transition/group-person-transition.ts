import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base';
import { Person } from '../../person';
import { GroupTransition } from './group-transition';

export class GroupPersonTransition extends IdentifiedObject {

  @Type(() => GroupTransition)
  public groupTransition: GroupTransition;

  @Type(() => Person)
  public person: Person;

}
