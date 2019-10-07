import { Chat } from '../../chat/conversation';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileChat extends FileObject<Chat> {
  constructor() {
    super();
    this.fileClass = FileClass.CHAT;
  }
}
