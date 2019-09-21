import { TypeOptions } from 'class-transformer';
import { GROUP_SUBTYPES } from './group-subtypes';

export const GROUP_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: GROUP_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
