import { User } from '../model/user';

export class IdentifiedObject {
  id: number;
  version: number;
  created: Date;
  deleted: Date;
  owner: User;
}
