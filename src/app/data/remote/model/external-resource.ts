import {IdentifiedObject} from '../base/identified-object';
import {FileClass} from './file/base/file-class';

export class ExternalResource extends IdentifiedObject {
  public clazz: FileClass;
  public objectId: number;
  public url: string;
}
