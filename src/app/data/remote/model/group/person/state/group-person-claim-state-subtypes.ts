import { GroupPersonClaimRank } from 'app/data/remote/model/group/person/state/group-person-claim-rank';
import { GroupPersonClaimStateType } from 'app/data/remote/model/group/person/state/group-person-claim-state-type';
import { GroupPersonClaimStatus } from 'app/data/remote/model/group/person/state/group-person-claim-status';
import { JsonSubType } from 'class-transformer';

export const GROUP_PERSON_CLAIM_STATE_SUBTYPES: JsonSubType[] = [
  {value: GroupPersonClaimStatus, name: GroupPersonClaimStateType.STATUS},
  {value: GroupPersonClaimRank, name: GroupPersonClaimStateType.RANK}
];
