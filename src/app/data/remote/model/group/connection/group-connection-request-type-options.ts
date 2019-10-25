import { TypeOptions } from 'class-transformer';
import { GROUP_CONNECTION_REQUEST_SUBTYPES } from './group-connection-request-subtypes';

export const GROUP_CONNECTION_REQUEST_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: GROUP_CONNECTION_REQUEST_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
