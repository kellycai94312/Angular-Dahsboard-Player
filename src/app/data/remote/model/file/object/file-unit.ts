import { BaseUnit } from '../../unit/base-unit';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileUnit extends FileObject<BaseUnit> {
  constructor() {
    super();
    this.fileClass = FileClass.UNIT;
  }
}
