import { BaseFile, FileType } from './base';

export class Folder extends BaseFile {
  constructor() {
    super();
    this.discriminator = FileType.FOLDER;
  }
}
