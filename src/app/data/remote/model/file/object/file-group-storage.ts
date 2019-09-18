import { Group } from '../../group/base/group';
import { FileClass } from '../base';
import { FileGroupStoragePrivacyEnum } from './file-group-storage-privacy-enum';
import { FileObject } from './file-object';

export class FileGroupStorage extends FileObject<Group> {
  public fileGroupStoragePrivacyEnum: FileGroupStoragePrivacyEnum;

  constructor() {
    super();
    this.fileClass = FileClass.GROUP_STORAGE;
  }
}
