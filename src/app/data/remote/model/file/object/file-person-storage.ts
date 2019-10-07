import { Person } from '../../person';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FilePersonStorage extends FileObject<Person> {
  constructor() {
    super();
    this.fileClass = FileClass.PERSON_STORAGE;
  }
}
