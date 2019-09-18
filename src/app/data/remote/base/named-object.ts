import { IdentifiedObject } from './identified-object';

export class NamedObject extends IdentifiedObject {
  public name: string;
  public description?: string;
}
