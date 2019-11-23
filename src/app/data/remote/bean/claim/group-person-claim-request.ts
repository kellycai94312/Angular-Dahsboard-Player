import { GroupPersonTypeClaim } from 'app/data/remote/model/group/person';
import { Person } from 'app/data/remote/model/person';

// Заявление в группу от физ лица
export class GroupPersonClaimRequest {
  public person: Person;
  public groupPersonTypeClaim: GroupPersonTypeClaim;
}
