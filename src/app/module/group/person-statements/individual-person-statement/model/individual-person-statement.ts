import { GroupPersonClaimRequestProfile } from 'app/data/remote/bean/claim';
import { Group } from 'app/data/remote/model/group/base';
import { GroupPersonTypeClaim } from 'app/data/remote/model/group/person';
import { Person } from 'app/data/remote/model/person';

export class IndividualPersonStatement {
  public group: Group;
  public person: Person;
  public groupPersonTypeClaim: GroupPersonTypeClaim;
  public groupPersonClaimRequestProfile: GroupPersonClaimRequestProfile;
}
