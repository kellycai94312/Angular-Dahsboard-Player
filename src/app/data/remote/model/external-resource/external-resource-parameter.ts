import { ExternalResource } from './external-resource';
import { ExternalResourceClass } from './external-resource-class';

export class ExternalResourceParameter extends ExternalResource {
  constructor() {
    super();
    this.discriminator = ExternalResourceClass.PARAMETER;
  }
}
