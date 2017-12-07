import { SexEnum } from '../misc/sex-enum';
import { Address } from './address';
import { IdentifiedObject } from '../base/identified-object';

export class Person extends IdentifiedObject {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: Date;
  sex: SexEnum;
  countryCode: string;
  phoneNumber: string;
  address: Address;
}
