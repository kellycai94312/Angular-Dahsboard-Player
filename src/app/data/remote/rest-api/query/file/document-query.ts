import {PageQuery} from '../../page-query';
import {FileClass} from '../../../model/file/base/file-class';
import {DocumentType} from '../../../model/document/document-type';

export class DocumentQuery extends PageQuery {
  public clazz: FileClass;
  public objectId: number;
  public type?: DocumentType;
}
