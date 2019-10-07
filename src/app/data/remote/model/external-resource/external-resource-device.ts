import { ExternalResource } from './external-resource';
import { ExternalResourceClass } from './external-resource-class';

export class ExternalResourceDevice extends ExternalResource {
  constructor() {
    super();
    this.discriminator = ExternalResourceClass.DEVICE;
  }
}
