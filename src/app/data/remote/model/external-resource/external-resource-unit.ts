import { ExternalResource } from './external-resource';
import { ExternalResourceClass } from './external-resource-class';

export class ExternalResourceUnit extends ExternalResource {
  constructor() {
    super();
    this.discriminator = ExternalResourceClass.UNIT;
  }
}
