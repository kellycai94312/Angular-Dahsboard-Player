import { BaseGroupPerson } from './base-group-person';
import { GroupPersonState } from './group-person-state';
import { GroupPersonType } from './group-person-type';

export class GroupPerson extends BaseGroupPerson {

  public state?: GroupPersonState;

  constructor() {
    super();
    this.discriminator = GroupPersonType.GROUP_PERSON;
  }

}
