import { TypeOptions } from 'class-transformer';
import { RANK_SUBTYPES } from './rank-subtypes';

export const RANK_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: RANK_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
