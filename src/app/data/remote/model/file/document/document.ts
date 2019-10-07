import { BaseFile } from '../base';
import { DocumentType } from './document-type';

// TODO: Remove it!
export class Document extends BaseFile {
  public type: DocumentType;
  public series: number;
  public number: number;
  public date: Date;
  public issuedBy?: string;
  public validityInDays?: number;

  constructor() {
    super();
  }
}
