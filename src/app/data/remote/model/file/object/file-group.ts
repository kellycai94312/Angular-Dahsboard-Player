import { Group } from '../../group/base/group';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileGroup extends FileObject<Group> {
  constructor() {
    super();
    this.fileClass = FileClass.GROUP;
  }
}
