import {BaseFileVersion} from '../base/base-file-version';
import {DocumentType} from './document-type';
import {FileType} from '../base/file-type';

export class DocumentVersion extends BaseFileVersion {
  type: DocumentType;
  number: number;
  date: Date;
  issuedBy?: string;

  constructor() {
    super();
    this.discriminator = FileType.DOCUMENT;
  }
}
