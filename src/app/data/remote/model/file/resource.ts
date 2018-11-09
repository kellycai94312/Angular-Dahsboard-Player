import {IdentifiedObject} from '../../base/identified-object';

export class Resource extends IdentifiedObject {
  public name: string;
  public length: number;
  public mimeType: string;

  // For UI
  public file: File;
}
