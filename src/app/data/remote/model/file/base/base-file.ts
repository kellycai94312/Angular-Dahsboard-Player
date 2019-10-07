import { Type } from 'class-transformer';
import { NamedObject } from '../../../base';
import { Person } from '../../person';
import { FileObject } from '../object';
import { FileType } from './file-type';

export class BaseFile extends NamedObject {

  public discriminator: FileType;
  public orderId?: number;

  @Type(() => Person)
  public person?: Person;

  // TODO: Add typization
  // @Type(() => FileObject)
  public ownerFileObject?: FileObject<any>;

}
