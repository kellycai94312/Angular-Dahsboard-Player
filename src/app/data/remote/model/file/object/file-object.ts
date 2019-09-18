import { IdentifiedObject } from '../../../base';
import { BaseFile, FileClass } from '../base';
import { Folder } from '../folder';

export abstract class FileObject<T extends IdentifiedObject> extends IdentifiedObject {
  public object: T;
  public file: BaseFile;
  public folder?: Folder;
  public fileClass: FileClass;
}
