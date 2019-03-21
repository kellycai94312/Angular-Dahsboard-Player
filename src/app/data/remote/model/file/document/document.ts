import {BaseFile} from '../base/base-file';
import {DocumentType} from './document-type';
import {FileType} from '../base/file-type';

export class Document extends BaseFile {
  type: DocumentType;
  number: number;
  date: Date;
  issuedBy?: string;
  validityInDays?: number;

  constructor() {
    super();
    this.discriminator = FileType.DOCUMENT;
  }
}
