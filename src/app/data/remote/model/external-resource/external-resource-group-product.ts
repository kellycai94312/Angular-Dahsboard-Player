import { ExternalResource } from './external-resource';
import { ExternalResourceClass } from './external-resource-class';

export class ExternalResourceGroupProduct extends ExternalResource {
  constructor() {
    super();
    this.discriminator = ExternalResourceClass.GROUP_PRODUCT;
  }
}
