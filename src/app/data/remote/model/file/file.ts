import { FileType, ResourceFile } from './base';

export class File extends ResourceFile {
  constructor() {
    super();
    this.discriminator = FileType.FILE;
  }
}
