import { ExternalResource } from './external-resource';
import { ExternalResourceClass } from './external-resource-class';

export class ExternalResourceApplication extends ExternalResource {
  constructor() {
    super();
    this.discriminator = ExternalResourceClass.APPLICATION;
  }
}
