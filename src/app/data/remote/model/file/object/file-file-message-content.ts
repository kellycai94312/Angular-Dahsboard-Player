import { FileMessageContent } from '../../chat/message';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileFileMessageContent extends FileObject<FileMessageContent> {
  constructor() {
    super();
    this.fileClass = FileClass.FILE_MESSAGE_CONTENT;
  }
}
