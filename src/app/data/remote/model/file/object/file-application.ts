import { Application } from '../../application/application';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileApplication extends FileObject<Application> {
  constructor() {
    super();
    this.fileClass = FileClass.APPLICATION;
  }
}
