import { Expose } from 'class-transformer';
import { IdentifiedObject } from '../../../base';
import { BaseFile, FileClass } from '../base';
import { Folder } from '../folder';

export class FileObject<T extends IdentifiedObject = IdentifiedObject> extends IdentifiedObject {

  public object: T;
  public file: BaseFile;
  public folder?: Folder;

  @Expose({name: '@type', toPlainOnly: true})
  public fileClass: FileClass;

}
