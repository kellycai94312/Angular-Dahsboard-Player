import { Type } from 'class-transformer';
import { NamedObject } from '../../../base';
import { Person } from '../../person';
import { FileObject } from '../object';
import { FileClass } from './file-class';
import { FileType } from './file-type';

export class BaseFile extends NamedObject {

  public discriminator: FileType;
  public clazz: FileClass;
  public orderId?: number;

  @Type(() => Person)
  public person?: Person;

  @Type(() => FileObject)
  public ownerFileObject?: FileObject<any>;

}
