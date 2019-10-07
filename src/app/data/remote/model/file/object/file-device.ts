import { Device } from '../../device/device';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileDevice extends FileObject<Device> {
  constructor() {
    super();
    this.fileClass = FileClass.DEVICE;
  }
}
