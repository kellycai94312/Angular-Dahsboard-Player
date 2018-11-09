import {IdentifiedObject} from '../../base/identified-object';
import {SportType} from '../sport-type';

export class MedicalExamination extends IdentifiedObject {
  sportType: SportType;
  number: number;
  startDate: Date;
  finishDate: Date;
  allowed: boolean;
}
