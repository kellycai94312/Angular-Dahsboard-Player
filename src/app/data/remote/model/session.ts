import {User} from './user';
import {Person} from './person';

export class Session {
  created: Date;
  updated: Date;
  expired: number;
  uuid: string;
  user: User;
  person: Person;
}
