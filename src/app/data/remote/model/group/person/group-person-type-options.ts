import { TypeOptions } from 'class-transformer';
import { GROUP_PERSON_SUBTYPES } from './group-person-subtypes';

export const GROUP_PERSON_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: GROUP_PERSON_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
