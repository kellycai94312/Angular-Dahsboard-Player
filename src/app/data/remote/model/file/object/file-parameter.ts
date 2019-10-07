import { BaseParameter } from '../../parameter/base-parameter';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileParameter extends FileObject<BaseParameter> {
  constructor() {
    super();
    this.fileClass = FileClass.PARAMETER;
  }
}
