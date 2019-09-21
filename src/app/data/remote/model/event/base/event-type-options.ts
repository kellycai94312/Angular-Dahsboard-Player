import { TypeOptions } from 'class-transformer';
import { EVENT_SUBTYPES } from './event-subtypes';

export const EVENT_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: EVENT_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
