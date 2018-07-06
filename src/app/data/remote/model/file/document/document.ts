import {BaseFile} from '../base/base-file';
import {DocumentType} from './document-type';
import {FileType} from '../base/file-type';

export class Document extends BaseFile {

  public type: DocumentType;
  public number: number;
  public date: Date;

  constructor() {
    super();
    this.discriminator = FileType.DOCUMENT;
  }

}
