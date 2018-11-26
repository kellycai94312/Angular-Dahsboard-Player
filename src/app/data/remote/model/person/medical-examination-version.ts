import {VersionObject} from '../../base/version/version-object';

export class MedicalExaminationVersion extends VersionObject {
  number: number;
  startDate: Date;
  finishDate: Date;
  allowed: boolean;
}
