import { Country } from 'app/data/remote/model/address/linked/country';
import { Type } from 'class-transformer';
import { AbstractVersionObject } from '../../base/version';
import { DocumentType } from './document-type';

export class DocumentVersion extends AbstractVersionObject {

  public type?: DocumentType;
  public series?: string;
  public number?: string;
  public date?: Date;
  public validityInDays?: number;
  public issuedBy?: string;
  public birthplace?: string;
  public verified?: boolean;

  @Type(() => Country)
  public citizenship?: Country;

}
