import { Expose, Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base';
import { BaseFile, FileClass } from '../base';
import { FILE_TYPE_OPTIONS } from '../base/file-type-options';
import { Folder } from '../folder';

export class FileObject<T extends IdentifiedObject = IdentifiedObject> extends IdentifiedObject {

  public object: T;

  @Type(() => BaseFile, FILE_TYPE_OPTIONS)
  public file: BaseFile;

  @Type(() => BaseFile, FILE_TYPE_OPTIONS)
  public folder?: Folder;

  @Expose({name: '@type', toPlainOnly: true})
  public fileClass: FileClass;

}
