import {IdentifiedObject} from '../../base/identified-object';

export class PersonRegistrationParameters extends IdentifiedObject {
  public athleteId?: boolean;
  public legalRepresentativesPhone?: boolean;
  public rank?: boolean;
  public medicalExamination?: boolean;
  public enrollAndTransfer?: boolean;
  public agreement?: boolean;
}
