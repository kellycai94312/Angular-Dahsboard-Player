import { JsonSubType } from 'class-transformer';
import { GroupPerson } from './group-person';
import { GroupPersonClaim } from './group-person-claim';
import { GroupPersonType } from './group-person-type';

export const GROUP_PERSON_SUBTYPES: JsonSubType[] = [
  {value: GroupPerson, name: GroupPersonType.GROUP_PERSON},
  {value: GroupPersonClaim, name: GroupPersonType.GROUP_PERSON_CLAIM}
];
