import { IdentifiedObject } from '../../base';
import { ExternalResourceClass } from './external-resource-class';

export class ExternalResource extends IdentifiedObject {
  public url: string;
  public discriminator: ExternalResourceClass;
}
