import { GroupNews } from '../../group/news/group-news';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FileGroupNews extends FileObject<GroupNews> {
  constructor() {
    super();
    this.fileClass = FileClass.GROUP_NEWS;
  }
}
