import { IdentifiedObject } from '../base';
import { FileClass } from './file/base';

export class ExternalResource extends IdentifiedObject {
  public clazz: FileClass;
  public objectId: number;
  public url: string;
}
