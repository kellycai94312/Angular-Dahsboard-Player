import { AbstractVersionObject } from '../../base/version/abstract-version-object';

export class MedicalExaminationVersion extends AbstractVersionObject {
  public number: number;
  public startDate: Date;
  public finishDate: Date;
  public allowed: boolean;
}
