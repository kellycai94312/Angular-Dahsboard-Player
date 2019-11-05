import { NamedObject } from 'app/data/remote/base';
import { ClaimStateEnum } from 'app/data/remote/model/group/person/state/claim-state-enum';

export class ClaimState extends NamedObject {
  public claimStateEnum: ClaimStateEnum;
}
