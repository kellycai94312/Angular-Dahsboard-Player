import { Person } from '../../person';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FilePerson extends FileObject<Person> {
  constructor() {
    super();
    this.fileClass = FileClass.PERSON;
  }
}
