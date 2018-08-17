import {IdentifiedObject} from '../../base/identified-object';

export class MedicalExamination extends IdentifiedObject {
  public passDate: Date;
  public approved: boolean;
  public recommendations: string;
}
