import { PersonNews } from '../../group/news/person-news';
import { FileClass } from '../base';
import { FileObject } from './file-object';

export class FilePersonNews extends FileObject<PersonNews> {
  constructor() {
    super();
    this.fileClass = FileClass.PERSON_NEWS;
  }
}
