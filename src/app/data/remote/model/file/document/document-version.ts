import { AbstractVersionObject } from '../../../base/version';
import { DocumentType } from './document-type';

export class DocumentVersion extends AbstractVersionObject {
  public type: DocumentType;
  public number: number;
  public date: Date;
  public issuedBy?: string;
  public validityInDays?: number;
}
