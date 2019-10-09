import { AbstractVersionObject } from '../../base/version';
import { DocumentType } from './document-type';

export class DocumentVersion extends AbstractVersionObject {
  public type?: DocumentType;
  public series?: string;
  public number?: string;
  public date?: Date;
  public validityInDays?: number;
  public issuedBy?: string;
}
