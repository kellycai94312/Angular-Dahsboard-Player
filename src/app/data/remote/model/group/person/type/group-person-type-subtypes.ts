import { JsonSubType } from 'class-transformer';
import { GroupPersonType, GroupPersonTypeClaim, GroupPersonTypeEnum } from './';

export const GROUP_PERSON_TYPE_SUBTYPES: JsonSubType[] = [
  {value: GroupPersonType, name: GroupPersonTypeEnum.TYPE},
  {value: GroupPersonTypeClaim, name: GroupPersonTypeEnum.TYPE_CLAIM}
];
