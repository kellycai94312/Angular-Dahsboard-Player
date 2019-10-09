import { AbstractVersionObject } from 'app/data/remote/base/version';
import { DocumentClass } from 'app/data/remote/model/document/document-class';
import { Type } from 'class-transformer';
import { ResourceFile } from '../file/base';
import { DocumentType } from './document-type';

export class Document extends AbstractVersionObject {
  public clazz: DocumentClass;
  public objectId: number;

  @Type(() => ResourceFile)
  public file: ResourceFile;

  public type?: DocumentType;
  public series?: string;
  public number?: string;
  public date?: Date;
  public validityInDays?: number;
  public issuedBy?: string;
}
