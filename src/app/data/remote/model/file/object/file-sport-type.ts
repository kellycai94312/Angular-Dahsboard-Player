import { SportType } from '../../sport-type';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileSportType extends FileObject<SportType> {
  constructor() {
    super();
    this.fileClass = FileClass.SPORT_TYPE;
  }
}
