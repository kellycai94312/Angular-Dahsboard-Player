import {SexEnum} from '../misc/sex-enum';
import {Address} from './address';
import {IdentifiedObject} from '../base/identified-object';
import {User} from './user';
import {AthleteState} from './person/athlete-state';

export class Person extends IdentifiedObject {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: Date;
  sex: SexEnum;
  countryCode: string;
  phoneNumber: string;
  address: Address;
  user: User;
  athleteState: AthleteState;
}
