import { Organization } from 'app/data/remote/model/group/organization';
import { Person } from 'app/data/remote/model/person';

// Заявление в группу от юр. лица
export class GroupClaimRequest {
  public organization: Organization;
  public creator: Person;
  public creatorEmail: string;
  public creatorPhone: string;
}
