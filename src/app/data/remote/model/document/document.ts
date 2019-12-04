import { AbstractVersionObject } from 'app/data/remote/base/version';
import { Country } from 'app/data/remote/model/address/linked/country';
import { ResourceFile } from 'app/data/remote/model/file/base';
import { Type } from 'class-transformer';
import { DocumentClass } from './document-class';
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
  public birthplace?: string;
  // Лицо без гражданства
  public statelessness?: boolean;

  @Type(() => Country)
  public citizenship?: Country;

}
