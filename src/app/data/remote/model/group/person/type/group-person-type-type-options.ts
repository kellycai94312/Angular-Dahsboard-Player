import { TypeOptions } from 'class-transformer';
import { GROUP_PERSON_TYPE_SUBTYPES } from './';

export const GROUP_PERSON_TYPE_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: GROUP_PERSON_TYPE_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
