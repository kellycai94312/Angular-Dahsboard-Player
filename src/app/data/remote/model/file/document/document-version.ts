import {DocumentType} from './document-type';
import {VersionObject} from '../../../base/version/version-object';

export class DocumentVersion extends VersionObject {
  type: DocumentType;
  number: number;
  date: Date;
  issuedBy?: string;
  validityInDays?: number;
}
