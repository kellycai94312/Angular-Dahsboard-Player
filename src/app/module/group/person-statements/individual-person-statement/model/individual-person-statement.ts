import { GroupPersonClaimRequestProfile } from 'app/data/remote/bean/claim';
import { Group } from 'app/data/remote/model/group/base';
import { Person } from 'app/data/remote/model/person';

export class IndividualPersonStatement {
  public group: Group;
  public person: Person;
  public groupPersonClaimRequestProfile: GroupPersonClaimRequestProfile;
}
