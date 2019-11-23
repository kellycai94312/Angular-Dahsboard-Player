import { IdentifiedObject } from 'app/data/remote/base';
import { GroupClaimStateEnum } from 'app/data/remote/model/group';

// История изменений статуса заявления члена Федерации в роли юридического лица
export class GroupConnectionRequestClaimState extends IdentifiedObject {
  public claimStateEnum: GroupClaimStateEnum;
}
