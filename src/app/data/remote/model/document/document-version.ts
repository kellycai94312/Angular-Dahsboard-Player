import { AbstractVersionObject } from 'app/data/remote/base/version';
import { Country } from 'app/data/remote/model/address/linked';
import { Type } from 'class-transformer';
import { DocumentType } from './document-type';

export class DocumentVersion extends AbstractVersionObject {

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
