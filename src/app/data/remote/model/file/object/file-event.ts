import { BaseEvent } from '../../event/base/base-event';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileEvent extends FileObject<BaseEvent> {
  constructor() {
    super();
    this.fileClass = FileClass.EVENT;
  }
}
