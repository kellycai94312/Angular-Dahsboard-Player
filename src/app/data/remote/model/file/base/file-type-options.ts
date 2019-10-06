import { TypeOptions } from 'class-transformer';
import { FILE_SUBTYPES } from './file-subtypes';

export const FILE_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: FILE_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
